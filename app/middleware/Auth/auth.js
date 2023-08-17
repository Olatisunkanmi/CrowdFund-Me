const { Helper, constants, ApiError } = require('../../utils');
const { UserModel } = require('../../model');
const { UserService } = require('../../services');

const { findUserByEmail } = UserService;
const { errorResponse } = Helper;
const {
	USER_NOT_FOUND,
	INTERNAL_SERVER_ERROR,
	INVALID_EMAIL,
	INVALID_CREDENTIALS,
} = constants;

/**
 * A collection for middleware methods for user
 * @class AuthMiddleware
 */
class AuthMiddleware {
	/**
	 * Validates user's login credentials, with emphasis on the
	 * existence of a user with the provided email address.
	 * @static
	 * @param { Object } req- The request from the endpoint
	 * @param { Object } req - The response returned by the method
	 * @param { Object } next - calls the next handler
	 * @memberof AuthMiddleware
	 * @returns { JSON || Null } - Returns error if validation is fails and JSON null if otherwise
	 */
	static async validateLoginEmail(req, res, next) {
		try {
			const [data] = await findUserByEmail(req.body.email);
			const user = Helper.checkEmptyArray(data);

			req.user = user;

			return req.user
				? next()
				: errorResponse(
						req,
						res,
						new ApiError({
							status: 404,
							message: INVALID_CREDENTIALS,
						}),
				  );
		} catch (e) {
			Helper.apiErrLogMessager(e, req);
			errorResponse(
				req,
				res,
				new ApiError({ status: 404, message: INTERNAL_SERVER_ERROR }),
			);
		}
	}
}

module.exports = AuthMiddleware;
