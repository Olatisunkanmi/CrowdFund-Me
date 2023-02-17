const PaystackService = require('./paystack');
const StripeService = require('./stripe');
const PaypalServices = require('./Paypal');
const UserService = require('./users');
const CampaignService = require('./campaigns');

module.exports = {
	PaystackService,
	StripeService,
	PaypalServices,
	UserService,
	CampaignService,
};
