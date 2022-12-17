const e = require('cors');
const { PaystackService, StripeService } = require('../../services');
const { constants, Helper, ApiError } = require('../../utils');

const { SUCCESS } = constants;
const { successResponse, errorResponse } = Helper;

const { THIRD_PARTY_ERROR } = constants;
const {
	fetchStripeBalance,
	fetchStripeHistory,
	fetchAllStripeTransactions,
	fetchStripeTransactionbyDate,
} = StripeService;

const {
	fetchPaystackBalance,
	fetchPaystackHistory,
	fetchAllPaystackTransactions,
	fetchPaystackTransactionbyDate,
} = PaystackService;

/**
 * A collection of middleware methods for transactions
 * @class TransactionMiddleware
 */

class TransactionMiddleware {
	/**Returns a JSON
	 * @static
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
			let PaystackData = await (
				await fetchPaystackBalance()
			).data.data;

			let StripeData = await (
				await fetchStripeBalance()
			).data.available;

			let Data = [PaystackData, ...StripeData];

			// RE-ASSIGN StripeData to the another endpoint to get transaction list
			StripeData = await (
				await fetchAllStripeTransactions()
			).data.data.length;

			// Data = await Promise.all(Data);

			const total_transactions_paystack = Data[0].total_transactions;

			const total_volume_NGN =
				Data[0].total_volume_by_currency[0].amount;

			const total_volume_USD =
				Data[0].total_volume_by_currency[1].amount + Data[1].amount;

			const total_volume_GBP = Data[2].amount;

			Data = {
				total_transactions_stripe: StripeData,
				total_transactions_paypal: 0,
				total_transactions_paystack: total_transactions_paystack,
				total_volume_NGN: total_volume_NGN,
				total_volume_USD: total_volume_USD,
				total_volume_GBP: total_volume_GBP,
			};
			req.Balance = Data;
			next();
		} catch (e) {
			errorResponse(
				req,
				res,
				new ApiError({ message: THIRD_PARTY_ERROR, status: 404 }),
			);
		}
	}

	/**
	 * Returns a list of our newest transactions.
	 * @static
	 * @param {Request} req - The request from the endpoint
	 * @param {Response} res - The response returned back to the method
	 * @param {Next} next
	 * @param {PaystackData} - An Object response from Paystack Method
	 * @param {StripeData} - An Object response from Paystack Method
	 * @returns {Data} An object response containing the details
	 * @memberof TransactionMiddleware
	 */
	static async fetchTransactionHistory(req, res, next) {
		try {
			let PaystackData = await (
				await fetchPaystackHistory()
			).data.data;

			let StripeData = await (await fetchStripeHistory()).data.data;

			let Data = [...StripeData, ...PaystackData];

			Data = Data.map((el) => {
				const date = new Date(el.created_at || el.created * 1000);
				const available = new Date(
					el.available_on * 1000 || el.paid_at,
				);
				return {
					id: el.id,
					status: el.status || SUCCESS,
					currency: el.currency,
					channel: (el.channel && 'Paystack') || 'Stripe',
					description: el.description || el.customer.first_name,
					amount: el.amount,
					transaction_type: el.type || 'Unidentified Method',
					paid_at: date.toString('DD/MM/YYYY'),
					available_on: available.toDateString('DD/MM/YYYY'),
				};
			});

			req.TransactionHistory = Data;
			next();
		} catch (e) {
			console.log(e);
			errorResponse(
				req,
				res,
				new ApiError({ message: THIRD_PARTY_ERROR, status: 404 }),
			);
		}
	}

	/**
	 * Return compelete list of our Transaction
	 * @static
	 * @param {Request} req - The request from the endpoint
	 * @param {Response} res - The response returned to the method
	 * @param {Next} next - Pass to the next method
	 * @param {PaystackData} -An Object method from the paystack method
	 * @param {StripeData} -  An Object method from the stripe method
	 * @param {PaypalData} - An Object method from the paypal method
	 * @memberof TransactionMiddleware
	 */
	static async fetchAllTransactions(req, res, next) {
		try {
			let Data = await (
				await fetchAllPaystackTransactions()
			).data.data;

			console.log(Data.length);

			successResponse(res, { data: Data });
		} catch (e) {
			console.log(e);
			errorResponse(
				req,
				res,
				new ApiError({ message: THIRD_PARTY_ERROR, status: 404 }),
			);
		}
	}

	/**
	 * Return compelete Monthly Expenditons
	 * @static
	 * @param {Request} req - The request from the endpoint
	 * @param {Response} res - The response returned to the method
	 * @param {Next} next - Pass to the next method
	 * @param {PaystackData} -An Object method from the paystack method
	 * @param {StripeData} -  An Object method from the stripe method
	 * @param {PaypalData} - An Object method from the paypal method
	 * @memberof TransactionMiddleware
	 */
	static async fetchTransactionbyDate(req, res, next) {
		try {
			const { from, to } = req.query;

			if (from > to) {
				return errorResponse(
					req,
					res,
					new ApiError({
						message: 'Error in date formats, Please check',
						status: 401,
					}),
				);
			}

			let from_IsoString = new Date(from);
			let to_IsoString = new Date(to);

			// connvert Normal time to ISO for Paystack api
			let gte = from_IsoString.toISOString();
			let lte = to_IsoString.toISOString();

			let PaystackData = await (
				await fetchPaystackTransactionbyDate(gte, lte)
			).data.data;

			// connvert Normal time to EPOCH for api
			gte = from_IsoString.getTime() / 1000;
			lte = to_IsoString.getTime() / 1000;

			let StripeData = await (
				await fetchStripeTransactionbyDate(gte, lte)
			).data.data;

			let Data = [...PaystackData, ...StripeData];

			Data = Data.map((el) => {
				const date = new Date(
					el.created_at || el.available_on * 1000,
				);
				return {
					id: el.id,
					currency: el.currency,
					channel: (el.channel && 'Paystack') || 'Stripe',
					amount: el.amount,
					fees: el.fees || el.fee,
					Date: date.toDateString('DD/MM/YYYY'),
					net: el.net || el.amount - el.fees,
				};
			});

			let net_NGN = [{ net_amount: 0 }];
			let net_USD = [{ net_amount: 0 }];
			let net_GBP = [{ net_amount: 0 }];

			for (let i = 0; i < Data.length; i++) {
				const el = Data[i];

				if (el.currency == 'NGN') {
					net_NGN[0].net_amount += el.net;

					net_NGN.push(el);
				}
				if (el.currency == 'usd') {
					net_USD[0].net_amount += el.net;

					net_USD.push(el);
				}
				if (el.currency == 'gbp') {
					net_GBP[0].net_amount += el.net;

					net_GBP.push(el);
				}
			}

			Data = {
				net_NGN: net_NGN,
				net_USD: net_USD,
				net_GBP: net_GBP,
			};

			req.net_Balance = Data;
			next();
		} catch (e) {
			console.log(e);
		}
	}

	//
}

module.exports = TransactionMiddleware;
