const config = require("../../../../config/env");
const axios = require("axios").default;
const constants = require("../constants");

const { GENERATE_PAYPAL_ACCESS_TOKEN, VIEW_ALL_TRANSACTIONS_ENDPOINT } =
  constants;

const {
  CHAINFOUNDATION_PAYPAL_SECRET_KEY,
  CHAINFOUNDATION_PAYPAL_CLIENT_ID,
  CHAINFOUNDATION_PAYPAL_ACCESS_TOKEN,
} = config;

const client_ID = CHAINFOUNDATION_PAYPAL_CLIENT_ID;
const secret = CHAINFOUNDATION_PAYPAL_SECRET_KEY;
const access = CHAINFOUNDATION_PAYPAL_ACCESS_TOKEN;
//
// Set Interval Funtion to generate new access token every 8 hours.

// setTimeout(async function getToken() {
// 	try {
// 		const resp = await PaypalServices.generatePaypalAccessToken();
// 		console.log(resp.data);
// 	} catch (e) {
// 		console.log(e);
// 	}
// }, 80000000);
//

const Header = { Authorization: `bearer ${access}` };

/**
 * A collection of services methods for flutterwave
 * @class PaypalServices
 */
class PaypalServices {
  /**
   *	A function that generates Paypal access token every 8 hours.
   * @static
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof PaypalServices
   * @returns {JSON} - A JSON server response.
   */
  static generatePaypalAccessToken(req, res, next) {
    return axios({
      method: "post",
      url: GENERATE_PAYPAL_ACCESS_TOKEN,

      auth: {
        username: client_ID,
        password: secret,
      },

      data: `grant_type=refresh_token&refresh_token=${access}`,
    });
  }

  /**
   *
   * A function that generates Paypal transactions list
   * @static
   * @returns response object from Stripe api
   * @memberof PaypalServices
   *  @returns {JSON} - A JSON server response.
   */
  static fetchAllPaypalTransactions(gte, lte) {
    return axios({
      url: VIEW_ALL_TRANSACTIONS_ENDPOINT(gte, lte),
      method: "get",

      headers: { Authorization: `bearer ${access}` },
    });
  }
}

module.exports = PaypalServices;
