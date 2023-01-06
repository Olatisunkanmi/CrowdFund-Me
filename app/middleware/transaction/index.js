const { performance } = require('perf_hooks');
const {
	PaystackService,
	StripeService,
	PaypalServices,
} = require('../../services');
const { constants, Helper, ApiError } = require('../../utils');

const { SUCCESS } = constants;
const { successResponse, errorResponse, Performance } = Helper;

const { THIRD_PARTY_ERROR, INTERNAL_SERVER_ERROR } = constants;
const {
	fetchStripeBalance,
	fetchAllStripeTransactions,
	fetchStripeCharges,
} = StripeService;

const { fetchPaystackBalance, fetchAllPaystackTransactions } =
	PaystackService;

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
	 * @param {PaystackData} -An Object method from the paystack method
	 * @param {StripeData} -  An Object method from the stripe method
	 * @param {PaypalData} - An Object method from the paypal method
	 * @memberof TransactionMiddleware
	 */
	static async fetchTransactions(req, res, next) {
		const { start, end } = req.query;

		try {
			var Data;

			let PaystackData = (await fetchAllPaystackTransactions()).data
				.data;
			let PaypalData = (await fetchAllPaypalTransactions(start, end))
				.data.transaction_details;
			let StripeData = (await fetchAllStripeTransactions()).data.data;

			Data = [...PaypalData, ...PaystackData, ...StripeData];

			// Find net of Each Currency.
			let net_NGN = {
				total_amount: 0,
				net_amount: 0,
				net_platform: 0,
			};
			let net_USD = {
				total_amount: 0,
				net_amount: 0,
				net_platform: 0,
			};
			let net_GBP = {
				total_amount: 0,
				net_amount: 0,
				net_platform: 0,
			};

			Data = Data.map((el) => {
				//set date of transactions
				const cur_date = new Date(
					el.paid_at ||
						el.created * 1000 ||
						el.transaction_info.transaction_initiation_date,
				);

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

				//calculate 5% of each transaction
				const cur_percent = 0.05 * transaction_amount;

				// platform fee =(  5% - networok fee )
				let platform_fee =
					(cur_percent - el.fees) / 100 ||
					cur_percent - el.fee ||
					cur_percent - el.transaction_info.fee_amount.value * -1;

				//If Platform is less than 0, means network fee > 5%
				platform_fee < 0 ? (platform_fee = 0) : platform_fee;

				// calc the net_amount of each transaction - after 5%
				const cur_net = transaction_amount - cur_percent;

				// if  campaign Title is missing from Paystack
				if (el.customer) {
					if (el.customer.first_name) {
						el.customer = `${el.customer.first_name}, ${el.customer.last_name}, ${el.customer.email}`;
					} else {
						el.customer = el.metadata.custom_fields[0].value;
					}
				}

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

				if (cur_currency == 'NGN' && cur_status == 'success') {
					net_NGN.total_amount += transaction_amount;
					net_NGN.net_amount += cur_net;
					net_NGN.net_platform += platform_fee;
				}

				if (cur_currency == 'USD' && cur_status == 'success') {
					net_USD.total_amount += transaction_amount;
					net_USD.net_amount += cur_net;
					net_USD.net_platform += platform_fee;
				}
				if (cur_currency == 'GBP' && cur_status == 'success') {
					net_GBP.total_amount += transaction_amount;
					net_GBP.net_amount += cur_net;
					net_GBP.net_platform += platform_fee;
				}

				return {
					id: el.id || el.transaction_info.transaction_id,
					status: cur_status,
					transaction_amount: transaction_amount,
					currency: cur_currency,
					network_fee:
						el.fee ||
						el.fees / 100 ||
						el.transaction_info.fee_amount.value * -1,
					platform_fee: platform_fee,
					net_amount: cur_net,
					paid_at: cur_date.toString('DD/MM/YYYY'),
					channel:
						(el.channel && 'Paystack') ||
						(el.object && 'Stripe') ||
						(el.transaction_info.protection_eligibility && 'Paypal'),
					description:
						el.description ||
						el.customer ||
						el.transaction_info.transaction_subject,
				};
			});

			const newData = {
				Net: {
					net_NGN: net_NGN,
					net_GBP: net_GBP,
					net_USD: net_USD,
				},
				transaction_list: Data,
			};

			req.transactions = newData;
			next();
		} catch (e) {
			logger.info(e);
			console.log(e);
			// console.log(e.response.data);

			return errorResponse(
				req,
				res,
				new ApiError({
					message: INTERNAL_SERVER_ERROR,
					status: 401,
				}),
			);
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
				let cur_meta, cur_origin, cur_date, giftAid, giftAid_details;

				//set date of transactions
				cur_date = new Date(
					el.paid_at ||
						el.created * 1000 ||
						el.transaction_info.transaction_initiation_date,
				);

				if (el.metadata) {
					cur_origin = el.metadata.origin;

					if (el.metadata.Consent) {
						giftAid = 'true';
						giftAid_details = el.metadata;
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
					giftAid_details: giftAid_details,
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
	static async findTransactionbyId(req, res, next) {
		logger.info(req.params.id);
	}
}

module.exports = TransactionMiddleware;
