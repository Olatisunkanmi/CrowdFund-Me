const TransactionHelper = require('./helper');
const {
	PaystackService,
	StripeService,
	PaypalServices,
} = require('../../services');
const { constants, Helper, ApiError } = require('../../utils');

const { fetchApiData } = TransactionHelper;
const { successResponse, errorResponse, Performance, curTime } =
	Helper;

const { SUCCESS, THIRD_PARTY_ERROR, INTERNAL_SERVER_ERROR } =
	constants;
const {
	fetchStripeBalance,
	fetchAllStripeTransactions,
	fetchStripeCharges,
} = StripeService;

const {
	fetchPaystackBalance,
	fetchAllPaystackTransactions,
	chargeCard,
} = PaystackService;

const { fetchAllPaypalTransactions } = PaypalServices;
/**
 * A collection of middleware methods for transactions
 * @class TransactionMiddleware
 */

class TransactionMiddleware {
	/**
	 * Return compelete Transactions and Platform Net
	 * @static
	 * @Route "/ "
	 * @param {Request} req - The request from the endpoint
	 * @param {Response} res - The response returned to the method
	 * @param {Next} next - Pass to the next method
	 * @memberof TransactionMiddleware
	 */

	static async fetchTransactions(req, res, next) {
		try {
			const start = curTime();
			const data = await fetchApiData(
				fetchAllPaystackTransactions,
				fetchAllStripeTransactions,
			);

			const end = curTime();

			Helper.Performance(start, end);

			// req.transactions = { transaction_list, transaction_lenght };
			logger.debug(data.length);

			req.transactions = data;
			next();
		} catch (e) {
			logger.debug(e.message);
			console.info(e.response.data);
		}
	}

	/**Returns a JSON of our Total balance
	 * @static
	 * @Route {/balance}
	 * @param {Request} req - The request from the endpoint
	 * @param {Response} res - The response returned back to the method
	 * @param {Next} next
	 * @param {PaystackData} - An Object response from Paystack Method
	 * @param {StripeData} - An Object response from Paystack Method
	 * @returns {Data} An object response containing the details
	 * @memberof TransactionMiddleware
	 */
	static async fetchTransactionBalance(req, res, next) {
		try {
			let start = performance.now();
			let PaypalData, Data;

			// PaystackData = await (await fetchPaystackBalance()).data.data;

			// StripeData = await (await fetchStripeBalance()).data.available;

			Promise.all([
				(await fetchPaystackBalance()).data.data,
				(await fetchStripeBalance()).data.available,
			]).then((results) => {
				Data = [...results];

				return Data;
			});

			// fetchPaystackBalance()
			// 	.then((result) => {
			// 		PaystackData = result.data.data;

			// 		return fetchStripeBalance();
			// 	})
			// 	.then((result) => {
			// 		StripeData = result.data.available;
			// 	})

			// 	.catch((e) => {
			// 		console.log(e.response.data);
			// 		errorResponse(
			// 			req,
			// 			res,
			// 			new ApiError({
			// 				message: INTERNAL_SERVER_ERROR,
			// 				status: 404,
			// 			}),
			// 		);
			// 	});

			// Get Length of Stripe Transactions
			// let stripeDataLength = await (
			// 	await fetchAllStripeTransactions()
			// ).data.data.length;

			const end = performance.now();
			Performance(start, end);

			// Deconstruct Data

			const { PaystackData = Data[0], StripeData = Data[1] } = Data;

			const total_transactions_paystack =
				PaystackData.total_transactions;

			const total_volume_NGN =
				PaystackData.total_volume_by_currency[0].amount;

			const total_volume_USD =
				PaystackData.total_volume_by_currency[1].amount +
				StripeData[0].amount;

			const total_volume_GBP = StripeData[1].amount;

			const pending_transactions_NGN =
				PaystackData.pending_transfers_by_currency[0].amount;

			const pending_transactions_USD =
				PaystackData.pending_transfers_by_currency[1].amount;

			Data = {
				total_transactions: {
					stripe: 0,
					paypal: 0,
					paystack: total_transactions_paystack,
				},
				current_balance: {
					current_balance_NGN: total_volume_NGN,
					current_balance_USD: total_volume_USD,
					current_balance_GBP: total_volume_GBP,
				},
				pending_transactions: {
					paystack_NGN: pending_transactions_NGN,
					paystack_USD: pending_transactions_USD,
				},
			};

			req.Balance = Data;
			next();
		} catch (e) {
			console.log(e);
			errorResponse(
				req,
				res,
				new ApiError({ message: INTERNAL_SERVER_ERROR, status: 404 }),
			);
		}
	}

	/**
	 * @static
	 * @Route {/gift-aid-donations}
	 * @param {Request} req - The request from the endpoint
	 * @param {Response} res - The response returned back to the method
	 * @param {Next} next
	 * @param {PaystackData} - An Object response from Paystack Method
	 * @param {StripeData} - An Object response from Paystack Method
	 * @returns {Data} An object response containing the details
	 * @memberof TransactionMiddleware
	 */
	static async fetchGiftAidDonations(req, res, next) {
		const { start, end } = req.query;

		try {
			let stripeData = await (await fetchStripeCharges()).data.data;
			let PaystackData = (await fetchAllPaystackTransactions()).data
				.data;
			let PaypalData = (await fetchAllPaypalTransactions(start, end))
				.data.transaction_details;

			let Data = [...stripeData, ...PaypalData, ...PaystackData];

			Data = Data.map((el) => {
				let cur_meta, cur_origin, cur_date, giftAid;

				//set date of transactions
				cur_date = new Date(
					el.paid_at ||
						el.created * 1000 ||
						el.transaction_info.transaction_initiation_date,
				);

				if (el.metadata) {
					cur_origin = el.metadata.origin;

					if (el.metadata.Consent) {
						giftAid = {
							approved: true,
							details: el.metadata,
						};
					}
				}
				// find transaction status
				let cur_status =
					el.paid ||
					el.status ||
					el.transaction_info.transaction_status;

				if (cur_status == 'S') {
					cur_status = 'success';
				} else if (cur_status == 'available') {
					cur_status = 'success';
				} else if (cur_status == 'success') {
					cur_status = 'success';
				}

				if (cur_status == 'pending') {
					cur_status = 'pending';
				}

				// find transaction amount
				const transaction_amount =
					el.amount ||
					el.transaction_info.transaction_amount.value * 1;

				// if  campaign Title is missing from Paystack
				// if (el.customer) {
				// 	if (el.customer.first_name) {
				// 		el.customer = `${el.customer.first_name}, ${el.customer.last_name}, ${el.customer.email}`;
				// 	} else {
				// 		el.customer = el.metadata.custom_fields[0].value;
				// 	}
				// }

				// currrent currency
				let cur_currency =
					el.currency ||
					el.transaction_info.transaction_amount.currency_code;

				if (cur_currency == 'usd') {
					cur_currency = 'USD';
				}

				if (cur_currency == 'gbp') {
					cur_currency = 'GBP';
				}

				return {
					id: el.id || el.transaction_info.transaction_id,
					status: cur_status,
					transaction_amount: transaction_amount,
					currency: cur_currency,
					channel:
						(el.channel && 'Paystack') ||
						(el.object && 'Stripe') ||
						(el.transaction_info.protection_eligibility && 'Paypal'),
					description:
						el.description ||
						el.customer ||
						el.transaction_info.transaction_subject,
					origin: cur_origin,
					giftAid: giftAid,
					date: cur_date.toString('DD/MM/YYYY'),
				};
			});

			const newData = {
				transaction_list: Data,
			};

			req.transactions = newData;
			next();
		} catch (e) {
			logger.warn(e);
			console.log(e);
			errorResponse(
				req,
				res,
				new ApiError({ message: INTERNAL_SERVER_ERROR, status: 404 }),
			);
		}
	}

	/**
	 * Transaction Middlleware for initializing card transafer (charge card)
	 *	@static
	 * @param {Request} req - The request from the endpoint.
	 * @param {Response} res - The response returned by the method.
	 * @param {Next} next
	 * @memberof TransactionMiddleware
	 * @returns { JSON } A JSON response containing the details of the contact us added
	 */
	static async initCardCharge(req, res, next) {
		try {
			const resp = await chargeCard(req.body);
			logger.warn(resp.data.data);
		} catch (e) {
			console.log(e.response.data);
			errorResponse(req, res, {
				status: 404,
				message: e.message,
			});
		}
	}

	static filterByDateRange(transactions, startDate, endDate) {
		return transactions.filter((transaction) => {
			const paidAtDate = new Date(transaction.paid_at);
			return paidAtDate >= startDate && paidAtDate <= endDate;
		});
	}

	/**
	 * @static
	 */
	static calculateTransactionNet(req, res, next) {
		// const { transaction_list, transaction_lenght } = req.transactions;
		const data = req.transactions;

		let { net_NGN, net_USD, net_GBP } =
			TransactionHelper.setCurrencyNet();

		const Net = TransactionHelper.findCurrencyNet(
			data,
			net_NGN,
			net_USD,
			net_GBP,
		);

		console.log(Net);

		res.status(200).json({
			Net: Net,
			data: data,
		});
	}

	/**
	 * @static
	 */
	static QueryTransactions(req, res, next) {
		const data = req.transactions;

		logger.warn(req.query);

		//1. Filter query
		const queryObj = { ...req.query };
		const excludedFields = [
			'page',
			'sort',
			'limit',
			'fields',
			'start',
			'end',
		];
		excludedFields.forEach((el) => delete queryObj[el]);

		// console.log(queryObj);

		let query = data.filter((el) => {
			return Object.keys(queryObj).every(
				(key) => el[key] === queryObj[key],
			);
		});

		// let query = TransactionMiddleware.filterByDateRange(
		// 	data,
		// 	start,
		// 	end,
		// );

		req.transactions = query;
		next();
	}
}

module.exports = TransactionMiddleware;
