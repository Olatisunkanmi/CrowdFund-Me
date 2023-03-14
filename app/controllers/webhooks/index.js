const { Helper, contants } = require('../../utils');
const crypto = require('crypto');
const { successResponse, errorResponse } = Helper;

class WebhookController {
	/**
	 *Receives Paystack webhook
	 * @static
	 * @memberof WebhookController
	 * @return
	 */
	static WebhookResponse(req, res, next) {
		try {
			res.sendStatus(200);
			next();
		} catch (e) {
			errorResponse(req, res, {
				status: 404,
				message: e.message,
			});
		}
	}
}

module.exports = WebhookController;
