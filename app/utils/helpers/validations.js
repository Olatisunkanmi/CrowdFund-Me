/**
 * Conatins validation helpers
 *@class ValidationHelper
 */

class ValidationHelper {
	/**
	 * It validates a string
	 * @static
	 * @param {string} param - The name of the field to validate
	 * @param {object} joiObject - The joi object
	 * @param {integer} min - The minimum value of the field
	 * @param {integer} max - The maximum value of the field
	 * @memberof ValidationHelper
	 * @returns {Boolean} - True or false
	 */
	static validateString(param, joiObject, min = 1, max = 100) {
		return joiObject
			.string()
			.required()
			.min(min)
			.max(max)
			.messages({
				'any.required': `${param} is a required field`,
				'string.max': `${param} can not be lesser than ${max} characters`,
				'string.min': `${param} can not be lesser than ${min} characters`,
				'string.base': `${param} must be a string`,
				'string.empty': `${param} cannot be an empty field`,
			});
	}

	/**
	 * it validates an email
	 * @static
	 * @param {string} param - The name of the field to validate
	 * @param {object} joiObject - The joi object
	 * @memberof ValidationHelper
	 * @returns {Boolean} - True or false
	 */
	static validateEmail(param, joiObject) {
		return joiObject
			.string()
			.email()
			.required()
			.messages({
				'any.required': `${param} is a required field`,
				'string.base': `${param} must be a string`,
				'string.empty': `${param} cannot be an empty field`,
			});
	}

	/**
	 * it validates a password
	 * @static
	 * @param {string} param - The name of the field to validate
	 * @param {string} joiObject - The joi Object
	 * @memberof ValidationHelper
	 * @param {Boolean} - True or false
	 */
	static validatePassword(param, joiObject) {
		return joiObject
			.string()
			.trim()
			.required()
			.min(7)
			.messages({
				'string.base': `${param} must be a string`,
				'string.empty': `${param} field cannot be an empty field`,
				'any.required': `${param} field is required`,
				'string.min': `${param} cannot be lesser than 7 character`,
			});
	}

	/**
	 * It validates a number with minimum and maximum value
	 * @static
	 * @param {string} param - The name of the filed to validate
	 * @param {object} object -
	 * @memberof ValidationHelper
	 * @returns { Boolean } - True or false
	 */
	static validateAmount(param, joiObject) {
		return joiObject
			.number()
			.optional()
			.messages({
				'any.required': `${param} is a required field`,
				'number.base': `${param} must be a number`,
				'number.empty': `${param} cannot be an empty field`,
			});
	}

	/**
	 * It validates a number with minimum and maximum value
	 * @static
	 * @param {string} param - The name of the filed to validate
	 * @param {object} joiObject - The Joi Object
	 * @memberof ValidationHelper
	 * @returns { Boolean } - True or flase
	 */
	static validateNumber(param, joiObject) {
		return joiObject
			.number()
			.required()
			.messages({
				'any.required': `${param} is a required field`,
				'number.base': `${param} must be a number`,
				'number.empty': `${param} cannot be an empty field`,
			});
	}

	/**
	 * It validates a string is part of an enum
	 * @static
	 * @param { array } fields - An array of enum fields
	 * @param { string } param - The name of the filed to validate
	 * @param  {object} joiObject - the Joi Object
	 * @memberof validationHelper
	 * @returns {Boolean} - True or false
	 */
	static validateEnums(fields, param, joiObject) {
		return joiObject
			.string()
			.required()
			.valid(...fields)
			.messages({
				'any.required': `${param} is a required field`,
				'any.only': `Please enter a valid ${param}`,
				'string.base': `${param} must be a string`,
				'string.empty': `${param} field cannot be an empty field`,
			});
	}

	/**
	 * It validates a card number with minimun and maximum values
	 * @static
	 * @param { array } fields - An array of enum fields
	 * @param { string } param - The name of the filed to validate
	 * @param  {object} joiObject - the Joi Object
	 * @memberof validationHelper
	 * @returns {Boolean} - True or false
	 */
	static validateCardNumber(param, joiObject) {
		return joiObject
			.string()
			.required()
			.creditCard()
			.messages({
				'any.required': `${param} is a required field`,
				'string.base': `${param} must be a string`,
				'string.empty': `${param} cannot be an empty field`,
				'string.creditCard': `${param} must be a valid card number`,
			});
	}
}
module.exports = ValidationHelper;
