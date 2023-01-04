const constants = require('../constants');
const genericErrors = require('../error/generic');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

const { serverError } = genericErrors;
const { SUCCESS_RESPONSE, SUCCESS, FAIL } = constants;

/**
 *  Contains Helper Methods and Functions for the App
 *@class Helper
 */

class Helper {
	/**
	 * It parses a data
	 * @static
	 * @param {string} data - The data to be parsed
	 * @memberof Helper
	 * @returns {any} - The parsed data.
	 */
	static parseData(data) {
		return JSON.parse(data);
	}

	/**
	 * Generates a JSON response for success scenarios.
	 * @static
	 * @param {Response} res - Response object.
	 * @param {object} options - An object containing response properties.
	 * @param {object} options.data - The payload.
	 * @param {string} options.message -  HTTP Status code.
	 * @param {number} options.code -  HTTP Status code.
	 * @memberof Helper
	 * @returns {JSON} - A JSON success response.
	 */
	static successResponse(
		res,
		{ data, message = SUCCESS_RESPONSE, code = 200 },
	) {
		return res.status(code).json({
			status: SUCCESS,
			message,
			data,
		});
	}

	/**
	 * Generates a JSON response for failure scenarios.
	 * @static
	 * @param {Request} req - Request object.
	 * @param {Response} res - Response object.
	 * @param {object} error - The error object.
	 * @param {number} error.status -  HTTP Status code, default is 500.
	 * @param {string} error.message -  Error message.
	 * @param {object|array} error.errors -  A collection of  error message.
	 * @memberof Helper
	 * @returns {JSON} - A JSON server response.
	 */

	static errorResponse(req, res, error) {
		console.log(error.message);

		const aggregateError = { ...error };
		return res.status(aggregateError.status).json({
			status: FAIL,
			message: aggregateError.message,
			errors: aggregateError.errors,
		});
	}

	/**
	 * Calculates the runtime of any function
	 * @param
	 * @memberof Helper
	 */
	static Performance(start, end) {
		return logger.info(`Runtime: ${end - start} milliseconds`);
	}

	/**
	 * Limits requests rate to  app
	 * @param
	 * @param {Request} req - Request object.
	 * @param {Response} res - Response object.
	 * @param {Next } next - passes to the next function
	 * @memberof Helper
	 */
	static limitRate(req, res, next) {
		return rateLimit({
			windowMS: 5 * 60 * 100, //5 Minutes
			max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes )
			standardHeaders: true, //Return rate limit info in the `RateLimit -*` headers
			legacayHeaders: false, //Disable the `X-RateLimit-*` headers
		});
	}

	/**
	 *Checks if an object is empty
	 * @static
	 *@param {Object } - Object to be checked
	 *@memberof Helper
	 * @returns {}
	 */
	static checkEmptyObject(object) {
		if (Object.keys(object).length === 0) {
			return true;
		} else {
			return false;
		}

		return null;
	}
}

module.exports = Helper;
