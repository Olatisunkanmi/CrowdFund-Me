const Joi = require('joi');
const { ValidationHelper } = require('../utils');

const { validateString, validateNumber, validateEnums } =
	ValidationHelper;

const validateCampaign = Joi.object({
	title: validateString('Campaign Title', Joi),
	desc: validateString('Campaign Description', Joi),
	createdBy: validateString("Campaign creator's name ", Joi),
	type: validateEnums(['private', 'public'], 'Campaign Type', Joi),
	location: validateString('Campaign location', Joi),
	target: validateNumber('Campaign Target', Joi),
	currency: validateString('Campaigns currency', Joi),
	commission: validateNumber('Campaign commission', Joi),
});

module.exports = validateCampaign;
