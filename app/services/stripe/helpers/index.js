const helper = require('../constants/index');
const axios = require('axios').default;
const {
	VIEW_BALANCE_ENDPOINT,
	VIEW_TRANSACTIONS_ENDPOINT,
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
	 */
	static async fetchStripeBalance() {
		return await axios({
			url: VIEW_BALANCE_ENDPOINT,
			headers: Header,
		});
	}

	/***
	 * it receives transaction History data from the stripe Api
	 *@static
	 *@Headers : Headers sent with every req.
	 * @returns response object from Stripe api
	 * @memberof StripeService
	 */
	static async fetchStripeHistory() {
		return await axios({
			url: `${VIEW_TRANSACTIONS_ENDPOINT}?limit=10`,
			headers: Header,
		});
	}

	/***
	 * it receive all transaction data from the stripe Api
	 *@static
	 *@Headers : Headers sent with every req.
	 * @returns response object from Stripe api
	 * @memberof StripeService
	 */
	static async fetchAllStripeTransactions() {
		return await axios({
			url: VIEW_ALL_TRANSACTIONS_ENDPOINT,
			headers: Header,
		});
	}
}

module.exports = StripeService;
