const stripe = require("stripe")(
  "sk_test_51IcWgDHI63fHdch8RCCaF8E4bb8ER7UXTL3T2MrIuCrYXUaTOCF6bZkgN528mkq9W9B40nr4FKOuuoOOg1iJopBu000Q74vOie",
);
const { findCampaignById } = require("../../campaigns");

/**
 * Acollection of Helper methods for stripeServices
 * @class
 */

class stripeHelper {
  /**
   * Create a payment Intent
   * @static
   * @private
   * @memberof stripeHelper
   * @returns { JSON || NULL} payment intent created
   */
  static async createPayment(options) {
    return await stripe.paymentIntents.create({
      amount: options.amount,
      currency: options.currency,
      automatic_payment_methods: options.autoPayment,
      metadata: {
        campaign_title: options.title,
        desc: options.desc,
        created_by: options.createdBy,
      },
    });
  }

  /**
   * verify a payment
   * @static
   * @memberof stripeHelper
   * @return {JSON || NULL }
   */
  static async verifyPayment(options) {
    return stripe.paymentIntents.confirm(options.id, {
      return_url: "https://localhost:8000/api/v1/webhook/stripe",
      payment_method: "pm_card_visa",
    });
  }
}

module.exports = stripeHelper;
