const nodemailer = require('nodemailer');
const config = require('../../../../config/env');

const {
	EMAIL_TEST_ID,
	EMAIL_TEST_PSW,
	EMAIL_RECEIVER,
	EMAIL_SERVICE,
	EMAIL_SUBJECT,
	EMAIL_SENDER,
	EMAIL_HOST,
} = config;
/**
 * Contains Helper functions for webhook
 * @class WebhookHelper
 */

class WebhookHelper {
	/**
	 * Create a test account {To be used only during test cases}
	 * @static
	 * @returns { Object }
	 * @memberof WebhookHelper
	 */
	static async createTestAccount() {
		return await nodemailer.createTestAccount();
	}
	/**
	 * send mail
	 * @static
	 * @param { Object } - options
	 * @returns { Object } - response object from nodemailer
	 */
	static transportMail(transporter, Options) {
		return transporter.sendMail(Options, (error, info) => {
			if (error) {
				return error;
			} else {
				return info;
			}
		});
	}

	/**
	 * Create mail transporter
	 * @static
	 * @returns { Object } - transaction
	 * @memberof WebhookHelper
	 */
	static async createTransport() {
		return nodemailer.createTransport({
			service: EMAIL_SERVICE,
			host: EMAIL_HOST,
			port: 465,
			// secure: true,
			auth: {
				user: EMAIL_TEST_ID,
				pass: EMAIL_TEST_PSW,
			},
		});
	}

	/**
	 * Create Mail Options
	 * @static
	 * @memberof WebhoookHelper
	 * @returns { Object } - Options to used in sending mail
	 */
	static createOptions(Options) {
		return {
			from: EMAIL_SENDER,
			to: EMAIL_RECEIVER,
			subject: EMAIL_SUBJECT,
			text: Options,
		};
	}

	/**
	 * Sends mail
	 * @static
	 * @memberof WebhookHelper
	 */
	static async sendMail(data) {
		const transporter = await WebhookHelper.createTransport();
		const Options = await WebhookHelper.createOptions(data);

		return WebhookHelper.transportMail(transporter, Options);
	}

	/**
	 *
	 * @param {Object} transporter - Instances of transport
	 * @param {Object} Options - config options to use for mail transport
	 * @memberof WebhookHelper
	 * @returns {Prmoise}
	 */
	static transportMail(transporter, Options) {
		return new Promise((resolve, reject) => {
			transporter.sendMail(Options, (error, info) => {
				if (error) {
					reject(error);
				} else {
					resolve(info);
				}
			});
		});
	}
}

module.exports = WebhookHelper;
