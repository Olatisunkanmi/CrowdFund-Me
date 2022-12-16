const helper = require('../contants/index');
const axios = require('axios').default;
const { VIEW_TRANSACTIONS, VIEW_CUSTOMERS } = require('../contants');
const config = require('../../../config');
/**
 * contains Helper Methods for Paystack
 * @class PayStack Helper
 * @Headers : Headers sent with every req.
 */
const Headers = {
	Authorization: `bearer ${config.PAYSTACK_SECRET_KEY}`,
};
class PayStackHelper {
	/***
	 * it receives transaction data from the paystack Api
	 *@static
	 *
	 *
	 */

	static async retrieveTransactionData() {
		return await axios({
			url: `${VIEW_TRANSACTIONS}?page=1&status=success`,
			headers: Headers,
		});
	}

	/**
	 * it receives customer List from Paystack api
	 * @static
	 */
	static async retrieveCustomersList() {
		return await axios({
			// url: `${VIEW_CUSTOMERS}?page=8`,
			headers: Headers,
		});
	}
}

module.exports = PayStackHelper;
