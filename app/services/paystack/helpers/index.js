const config = require('../../../../config/env');
const axios = require('axios').default;
const constants = require('../constants');

const {
	VIEW_TRANSACTIONS_ENDPOINT,
	VIEW_CUSTOMERS,
	VIEW_ALL_TRANSACTIONS_ENDPOINT,
	VIEW_TRANSACTION_TOTALS,
} = constants;
/**
 * A collection of services methods for Paystack
 * @class -  PaystackServicePaystackService
 * @Header - HTTP header to be sent with every req. to paystack api
 * @SECRET : Paystack secret key
 */
// const SECRET = config.PAYSTACK_SECRET_KEY;

const Header = {
	Authorization: `bearer ${config.PAYSTACK_SECRET_KEY}`,
};

class PaystackService {
	/***
	 * it receive transaction data from the paystack Api
	 *@static
	 * @memberOf PaystackService
	 * @returns response object from paystack api
	 */

	static async fetchPaystackHistory() {
		return await axios({
			url: `${VIEW_TRANSACTIONS_ENDPOINT}?perPage=10`,
			headers: Header,
		});
	}

	/**
	 * receives customer list from the paystack api
	 * @static
	 * @memberOf PaystackService
	 * @returns response object from paystack api
	 */
	static async retrieveCustomersList() {
		return await axios({
			url: `${VIEW_CUSTOMERS}?page=8`,
			headers: Header,
		});
	}

	/**
	 * Receives Total Transaction balance from paystack api
	 * @static
	 *  @memberOf PaystackService
	 * @returns  res object containing  transaction balance
	 */
	static async fetchPaystackBalance() {
		return await axios({
			url: VIEW_TRANSACTION_TOTALS,
			headers: Header,
		});
	}

	/**
	 * Receives All Transactions History from Paystack api
	 * @static
	 * @memberOf PaystackServices
	 * @returns res object containing transaction balance
	 */
	static async fetchAllPaystackTransactions() {
		return await axios({
			url: VIEW_ALL_TRANSACTIONS_ENDPOINT,
			headers: Header,
		});
	}
}

module.exports = PaystackService;
