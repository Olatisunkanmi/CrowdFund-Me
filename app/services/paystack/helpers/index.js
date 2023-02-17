const config = require('../../../../config/env');
const axios = require('axios').default;
const constants = require('../constants');

const {
	VIEW_TRANSACTIONS_ENDPOINT,
	CHARGE_CARD,
	VIEW_CUSTOMERS,
	VIEW_ALL_TRANSACTIONS_ENDPOINT,
	VIEW_TRANSACTION_TOTALS,
} = constants;

/**
 * A collection of services methods for Paystack
 * @class -  PaystackServicePaystackService
 * @Header - HTTP header to be sent with every req. to paystack api
 */
// const SECRET = config.PAYSTACK_SECRET_KEY;

const Header = {
	Authorization: `bearer ${config.PAYSTACK_SECRET_KEY}`,
};

const test_Header = {
	Authorization: `bearer ${config.TEST_PAYSTACK_SECRET_KEY}`,
};

class PaystackService {
	/**
	 * receives customer list from the paystack api
	 * @static
	 * @returns response object from paystack api
	 * @memberof PaystackService
	 *
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
	 * @returns  res object containing  transaction balance
	 *  @memberof PaystackService
	 *
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
	 * @returns res object containing transaction balance
	 * @memberof PaystackServices
	 *
	 */
	static async fetchAllPaystackTransactions() {
		return await axios({
			url: VIEW_ALL_TRANSACTIONS_ENDPOINT,
			headers: Header,
		});
	}

	/**
	 *Charges a card
	 * @static
	 * @memberof PaystackServices
	 * @returns {Object} - reponse from paystack Api
	 */
	static async chargeCard(data) {
		return await axios({
			url: CHARGE_CARD,
			method: 'POST',
			headers: test_Header,

			data: data,
		});
	}
}

module.exports = PaystackService;
