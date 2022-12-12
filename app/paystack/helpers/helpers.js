const helper = require('../contants/index');
const axios = require('axios').default;
const { VIEW_TRANSACTIONS, VIEW_CUSTOMERS } = require('../contants');
const config = require('../../../config');
/**
 * contains Helper Methods for flutterwave
 * @class FlutterWaveHelper
 */

class PayStackHelper {
	/***
	 * it receive transaction data from the paystack Api
	 *@static
	 */

	static async retrieveTransactionData() {
		return await axios({
			url: `${VIEW_TRANSACTIONS}?page=1&status=success`,
			headers: {
				Authorization: `bearer ${config.PAYSTACK_SECRET_KEY}`,
			},
		});
	}

	/**
	 * receives
	 * @static
	 */
	static async retrieveCustomersList() {
		return await axios({
			// url: `${VIEW_CUSTOMERS}?page=8`,
			headers: {
				Authorization: `bearer ${config.PAYSTACK_SECRET_KEY}`,
			},
		});
	}
}

module.exports = PayStackHelper;
