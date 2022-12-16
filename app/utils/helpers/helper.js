const constants = require('../constants');
const genericErrors = require('../error/generic');

const { serverError } = genericErrors;
const { SUCCESS_RESPONSE, SUCCESS, FAIL } = constants;

/**
 *  Contains Helper Methods and Functions
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
	 * @memberof Helpers
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
	 * @memberof Helpers
	 * @returns {JSON} - A JSON failure response.
	 */
	// static errorResponse(req, res, error) {
	// 	const aggregateError = { ...serverError, ...error };
	// 	return res.status(aggregateError.status).json({
	// 		status: FAIL,
	// 		message: aggregateError.message,
	// 		errors: aggregateError.errors,
	// 	});
	// }

	static errorResponse(req, res, error) {
		console.log(error.message);

		const aggregateError = { ...serverError };
		return res.status(aggregateError.status).json({
			status: FAIL,
			message: aggregateError.message,
			errors: aggregateError.errors,
		});
	}
}

module.exports = Helper;
