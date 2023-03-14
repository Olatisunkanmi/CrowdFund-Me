const WebhookHelper = require('./helper');
const { Helper, constants, ApiError } = require('../../utils');
const config = require('../../../config/env');

const { PAYSTACK_HASH, PAYSTACK_SECRET_KEY } = config;
const { sendMail } = WebhookHelper;
const { INVALID_PERMISSION } = constants;
const { errorResponse, stringifyObject } = Helper;
/**
 * Middleware Function for webhook
 * @class WebhookMiddleware
 */

class WebhookMiddleware {
	/**
	 * @static
	 * @param { Object } req - the request object sent from the endpoint
	 * @param { Object } res - the response object returned by the method
	 * @param {Object } next - returns to the next method
	 * @memberof WebhookMiddleware
	 * @returns { JSON || NULL } -
	 */
	static async sendNotificationMail(req, res, next) {
		const { event, data } = req.body;

		try {
			let Options = {
				subject: event,
				status: data.gateway_response,
				paid_at: data.paid_at,
				channel: data.channel,
				currency: data.currency,
				donation_details: data.metadata,
			};

			// let Options = {
			// 	subject: 'event',
			// 	status: 'data.gateway_response',
			// 	paid_at: 'data.paid_at',
			// 	channel: ' data.channel',
			// 	currency: 'data.currency',
			// 	donation_details: 'data.metadata',
			// };

			Options = stringifyObject(Options);

			return await sendMail(Options);
		} catch (e) {
			Helper.apiErrLogMessager(e);
			errorResponse(
				re,
				res,
				new ApiError({ status: 404, message: e.message }),
			);
		}
	}
	/**
	 * @static
	 * @param { Object } req - the request object sent from the endpoint
	 * @param { Object } res - the response object returned by the method
	 * @param {Object } next - returns to the next method
	 * @memberof WebhookMiddleware
	 * @returns { JSON || NULL } -
	 */
	static async sendStripeNotificationMail(req, res, next) {
		const { id, created, data, object } = req.body;

		let Options = {
			subject: data.object.object,
			status: data.object.status,
			paid_at: data.object.created,
			currency: data.object.currency,
			donation_details: data.object.metadata,
		};
		Options = stringifyObject(Options);

		const mail = await sendMail(Options);

		if (mail) {
			next();
		}
		next();
	}

	/**
	 * Verify Header from incoming request
	 * @static
	 * @param { Object } req - the request object sent from the endpoint
	 * @param { Object } res - the response object returned by the method
	 * @param {Object } next - returns to the next method
	 * @memberof WebhookMiddleware
	 * @returns { JSON || NULL } -
	 */
	static verifyPaystackHeader(req, res, next) {
		//validate event

		try {
			const hash = Helper.generateHash(req.body);

			if (hash == req.headers['x-paystack-signature']) {
				next();
			} else {
				errorResponse(
					req,
					res,
					new ApiError({ status: 403, message: INVALID_PERMISSION }),
				);
			}
		} catch (e) {
			Helper.apiErrLogMessager(e);
			errorResponse(
				req,
				res,
				new ApiError({ status: 404, message: 'Webhook Error' }),
			);
		}
	}

	/**
	 * Verify Header from incoming request
	 * @static
	 * @param { Object } req - the request object sent from the endpoint
	 * @param { Object } res - the response object returned by the method
	 * @param {Object } next - returns to the next method
	 * @memberof WebhookMiddleware
	 * @returns { JSON || NULL } -
	 */
	static verifyStripeHeader(req, res, next) {
		try {
			next();
		} catch (e) {
			throw e;
		}
	}
}

module.exports = WebhookMiddleware;
