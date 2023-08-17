const WebhookHelper = require("./helper");
const { Helper, constants, ApiError } = require("../../utils");
const config = require("../../../config/env");
const campaign = require("../../sql/queries/campaign");

const { PAYSTACK_HASH, PAYSTACK_SECRET_KEY } = config;
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

    const campaignCreatorEmail = data.customer.email;

    try {
      let Options = {
        subject: event,
        amount: Helper.convertFigureToKobo(data.amount),
        payment_processor: "Paystack",
        payment_processor_fee: Helper.convertFigureToKobo(data.fees),
        channel: data.channel,
        status: data.gateway_response,
        currency: data.currency,
        paid_at: data.paid_at,
        channel: data.channel,
        donor_details: {
          name: data.authorization.sender_name,
          sender_bank: data.authorization.sender_bank,
          sender_country: data.authorization.sender_country,
        },
        campaign_details: {
          details: `${data.customer.first_name} ${data.customer.last_name}`,
          email: data.customer.email,
        },
      };

      const mail = await WebhookHelper.compileTemplate(Options);

      return WebhookHelper.sendMail(mail, campaignCreatorEmail);
    } catch (e) {
      logger.info("Send Notification Mail Error");
      Helper.apiErrLogMessager(e);
      errorResponse(
        req,
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
      amount: data.object.amount,
      status: data.object.status,
      paid_at: data.object.created,
      currency: data.object.currency,
      donation_details: data.object.metadata,
      donor_details: {
        name: data.authorization.sender_bank,
        sender_bank: data.authorization.sender_bank,
        sender_country: data.authorization.sender_country,
      },
      campaign_details: {
        details: `${data.customer.first_name} ${data.customer.last_name}`,
        email: data.customer.email,
      },
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
    try {
      const hash = Helper.generateHash(req.body);

      if (hash == req.headers["x-paystack-signature"]) {
        next();
      } else {
        errorResponse(
          req,
          res,
          new ApiError({ status: 403, message: INVALID_PERMISSION }),
        );
      }
    } catch (e) {
      logger.info("Verify Paystack Header Error");
      Helper.apiErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ status: 404, message: "Webhook Error" }),
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
