const { loggers } = require('winston');
const { UserSchema } = require('../../model/schema');
const { Helper } = require('../../utils');

const { errorResponse } = Helper;

/**
 * Contains a collection of service methods for managing User resource on the app.
 * @class UserService
 */

class UserService {
	/**
	 * Find all users in the database
	 */
	static async fetchUsers() {
		return await UserSchema.find();
	}

	/**
	 * finds user by email
	 * @static
	 * @memberof UserService
	 * @returns { Promise<Array<User> | Error> } - A promise that resolves or rejects
	 * with the user resource or DB Error
	 */
	static async findUserByEmail(email) {
		return await UserSchema.find({ email: email });
	}

	/**
	 * Populates user object with campaigns created or chain by the user
	 * @static
	 * @memberof UserService
	 * @returns { Promise<Array<User> | Error> } - A promise that resolves or rejects
	 * with the user resource or DB Error
	 */
	static async populateUserwithCampaign(email, campaign) {
		try {
			const data = await UserService.findUserByEmail(email);
			let user = Helper.checkEmptyArray(data);

			user = UserService.concatUser(user, campaign._id);

			await user.save();
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Concat user object with newly created or chained campaign
	 * @static
	 * @memberof UserService
	 * @returns { Promise<Array<User> | Error> } - A promise that resolves or rejects
	 * with the user resource or DB Error
	 */
	static concatUser(user, camapignId) {
		user.campaigns = user.campaigns.concat(camapignId);
		user.no_of_campaigns = user.no_of_campaigns + 1;

		return user;
	}
}

module.exports = UserService;
