const Joi = require('joi');
const { ValidationHelper, Helper } = require('../utils');

const {
	validateString,
	validatePassword,
	validateEmail,
	validateEnums,
	validateAmount,
} = ValidationHelper;

const ValidateUserSchema = Joi.object({
	first_name: validateString('First name', Joi, 5),
	last_name: validateString('Last name', Joi, 5),
	email: validateEmail('Email', Joi),
	user_type: validateEnums(
		['self_creator', 'ambassador'],
		'User type',
		Joi,
	),
	password: validatePassword('Password', Joi),
	confirm_password: validatePassword('Repeat Password', Joi),
	balance_gbp: validateAmount('GBP', Joi),
	balance_usd: validateAmount('USD', Joi),
	balance_ngn: validateAmount('NGN', Joi),
});

module.exports = ValidateUserSchema;
