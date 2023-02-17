const { Helper, ApiError, constants } = require('../../utils');

const { errorResponse } = Helper;
const { LOGIN_USER_SUCCESSFULLY } = constants;

/**
 	/**
 * A collection of methods that controls the success response for CRUD operations on auth.
 * @class AuthController
 */
class AuthController {
	/**
	 * Logs in a user
	 * @static
	 * @param { Object } req - The request from the enndpoint
	 * @param {Object } res - The response returned by the method
	 * @memberof AuthController
	 * @returns {JSON} -  A Json with the users details and a JWT Token
	 */
	static signIn(req, res) {
		const { user } = req;
		const data = Helper.addTokenToData(user);

		Helper.successResponse(res, {
			data: data,
			message: LOGIN_USER_SUCCESSFULLY,
			code: 201,
		});
	}
}

module.exports = AuthController;
