const PaystackService = require('./paystack');
const StripeService = require('./stripe');
const PaypalServices = require('./Paypal');
const UserService = require('./users');
const CampaignService = require('./campaigns');
const ChainCampaignService = require('./chainCampaigns');

module.exports = {
	PaystackService,
	StripeService,
	PaypalServices,
	UserService,
	CampaignService,
	ChainCampaignService,
};
