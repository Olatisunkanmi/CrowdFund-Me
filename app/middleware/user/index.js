const { Helper, ApiError, constants } = require('../../utils');
const { UserModel } = require('../../model');
const { UserService } = require('../../services');
const { findUserByEmail } = UserService;
const { errorResponse } = Helper;
const {
	EMAIL_CONFLICT,
	INTERNAL_SERVER_ERROR,
	RESOURCE_EXISTS_VERIFICATION_FAIL,
} = constants;

/**
 * A collection for middleware methods for user
 * @class UserMiddleware
 */
class UserMiddleware {
	/**
	 * Validates user unique credentials { Email }
	 * @static
	 * @param { Object } req - The request from the endpoint
	 * @param { Object } res - The response returned by the method.
	 * @param { Object } next - calls the next handle
	 * @memberof UserMiddleware
	 * @returns {JSON || Null } - Returns error response if validation fails or Null if otherwise.
	 */
	static async validateUserEmail(req, res, next) {
		try {
			const data = await findUserByEmail(req.body.email);
			const user = Helper.checkEmptyArray(data);

			return user
				? errorResponse(
						req,
						res,
						new ApiError({ status: 409, message: EMAIL_CONFLICT }),
				  )
				: next();
		} catch (e) {
			next(new ApiError({ message: e.message }));
		}
	}
}

module.exports = UserMiddleware;
