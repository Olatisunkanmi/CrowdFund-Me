const { Helper, ApiError } = require('../../utils');

const { validateInput, errorResponse } = Helper;

/**
 * @class ValidationMiddleware
 */
class ValidationMiddleware {
	/**
	 * it validates a schema object
	 * @static
	 * @param { schema }- The validation schema
	 * @param { Object } req - The request object from the endpoint
	 * @param { Object } res - The res object returned by the method
	 * @param { Next } next - calls the next handle
	 * @param {JSON  | Null} - Returns Error responce if validation fails || Null if otherwise
	 * @memberof ValidationMiddleware
	 */
	static validate(schema) {
		return async (req, res, next) => {
			try {
				await validateInput(schema, req.body);
				next();
			} catch (e) {
				logger.warn(e);
				next(new ApiError({ message: e.message }));
			}
		};
	}
}

module.exports = ValidationMiddleware;
