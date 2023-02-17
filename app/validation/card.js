const Joi = require('joi');
const { ValidationHelper } = require('../utils');
const {
	validateString,
	validateEnums,
	validateEmail,
	validateNumber,
	validateCardNumber,
} = ValidationHelper;

const validateCard = Joi.object({
	card_number: validateCardNumber('Card Number', Joi),
	cvv: validateString('Cvv', Joi),
	expiry_month: validateString('Expiry Month', Joi),
	expiry_year: validateString('Expiry Year', Joi),
	currency: validateEnums(['NGN', 'USD', 'GBP'], 'Currency', Joi),
	amount: validateNumber('Amount', Joi),
	full_name: validateString('Full Name', Joi, 7, 100),
	email: validateEmail('Email', Joi),
	// authorization: Joi.object({
	// 	mode: enumCheck(['pin'], 'Authorization.mode', Joi),
	// 	pin: stringCheck('Authorization.pin', Joi, 4, 4),
	// }),
});

module.exports = validateCard;
