const helper = require('../constants/index');
const axios = require('axios').default;
const {
	VIEW_BALANCE_ENDPOINT,
	VIEW_CHARGES_TRANSACTIONS_ENDPOINT,
	VIEW_ALL_TRANSACTIONS_ENDPOINT,
} = require('../constants');
const config = require('../../../../config/env');

/**
 * Contains Helper Methods for Stripe
 * @class Stripe Helper
 * @Header : Headers sent with every req.
 *
 */

const Header = {
	Authorization: `bearer ${config.STRIPE_SECRET_KEY}`,
};

class StripeService {
	/***
	 * it receive transaction data from the paystack Api
	 *@static
	 *@Headers : Headers sent with every req.
	 * @returns response object from stripe api
	 * @memberof StripeService
	 * @returns {JSON} - A JSON server response.
	 */
	static async fetchStripeBalance() {
		return await axios({
			url: VIEW_BALANCE_ENDPOINT,
			headers: Header,
		});
	}

	/***
	 *A function that generates ALL Stripe transactions
	 *@static
	 *@Headers : Headers sent with every req.
	 * @returns response object from Stripe api
	 * @memberof StripeService
	 * @returns {JSON} - A JSON server response.
	 */
	static async fetchAllStripeTransactions() {
		return await axios({
			url: VIEW_ALL_TRANSACTIONS_ENDPOINT,
			headers: Header,
		});
	}

	/***
	 *A function that generates charges Stripe transactions
	 *@static
	 *@Headers : Headers sent with every req.
	 * @returns response object from Stripe api
	 * @memberof StripeService
	 * @returns {JSON} - A JSON server response.
	 */
	static async fetchStripeCharges() {
		return await axios({
			url: VIEW_CHARGES_TRANSACTIONS_ENDPOINT,
			headers: Header,
		});
	}
}

module.exports = StripeService;
