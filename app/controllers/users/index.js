// const { UserModel } = require('../../model');
const { UserModel } = require('../../SQL models');
const {
	Helper,
	constants,
	ApiError,
	DBError,
} = require('../../utils');

const { successResponse, errorResponse } = Helper;
const {
	SUCCESS_RESPONSE,
	CREATE_USER_ERROR,
	CREATE_USER_SUCCESS,
	ERROR_FETCHING_USER,
} = constants;

/**
 * A collection of controller methods for users
 *@class UserController
 *
 */

class UserController {
	/**
	 *creates user
	 * @static
	 * @param {Request} req - The request from the endpoint
	 * @param {Request} res - The response returned.
	 * @param {Next} next -calls the next handler
	 * @memberof UserController
	 * @param {JSON } - A JSON response object of the newly created user
	 */

	static async createUser(req, res, next) {
		try {
			const user = await new UserModel({
				...req.body,
			});
			const data = await user.save();
			return successResponse(res, {
				message: CREATE_USER_SUCCESS,
				data: data,
			});
		} catch (e) {
			const dbError = new DBError({
				status: CREATE_USER_ERROR,
				message: e.message,
			});
			Helper.moduleErrLogMessager(dbError);
			return next(new ApiError({ message: CREATE_USER_ERROR }));
		}
	}

	/**
	 * Fetches all user
	 * @static
	 * @param {Request} req - The request from the endpoint
	 * @param {Response} res - The response returned.
	 * @param {Next} next -calls the next handler
	 * @memberof UserController
	 * @returns {JSON || NULL} - A JSON response object of all users or NULL
	 */

	static async fetchUser(req, res, next) {
		try {
			const data = req.user;

			return successResponse(res, {
				message: SUCCESS_RESPONSE,
				data: data,
			});
		} catch (error) {
			Helper.moduleErrLogMessager(error);
			errorResponse(
				req,
				res,
				new ApiError({
					status: 404,
					message: ERROR_FETCHING_USER,
				}),
			);
		}
	}
}

module.exports = UserController;
