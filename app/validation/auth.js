const Joi = require('joi');
const { ValidationHelper } = require('../utils');

const { validatePassword, validateEmail } = ValidationHelper;

const validateUserSignIn = Joi.object({
	email: validateEmail('Email', Joi),
	password: validatePassword('Password', Joi),
});

module.exports = validateUserSignIn;
