const { Helper, constants } = require('../../utils');
const { UserService, CampaignService } = require('../../services');

const { populateUserwithCampaign, findUserByEmail } = UserService;
const { findCampaignById } = CampaignService;
const { errorResponse } = Helper;
const { USER_CHAIN_ERROR, CHAINAMB_CHAIN_ERROR } = constants;

/**
 * A collection for middleware methods for campaigns
 * @class
 */
class CampaignMiddleware {
	/**
	 * Generates ID for camapigns
	 * @static
	 * @private
	 * @param { Object } - campaign object to
	 * @memberof CampaignMiddleware
	 * @return {JSON || Null } - returns a Json object of the campaign with a unique ID or Nulll if failed
	 */
	static async populateUser(req, res, next) {
		const user = await populateUserwithCampaign(
			req.user.email,
			req.body,
		);

		logger.info(user);
	}

	/**
	 * Populates camapign with the creator's ID
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 * @returns { JSON } - A Json object of the user with the newly populated campaign
	 */
	static async refrenceUser(req, res, next) {
		const { email, _id } = req.user;

		const options = {
			userID: _id,
			...req.body,
		};

		req.options = options;
		next();
	}

	/**
	 * fetches campaign by ID from database
	 * @static
	 * @memberof CampaignMiddleware
	 */
	static async findCampaignById(req, res, next) {
		const data = await findCampaignById(req.params.id);
		const campaign = Helper.checkEmptyArray(data);

		req.campaign = campaign;
		next();
	}

	/**
	 * Checks user object for campaign
	 * @static
	 * @memberof CampaignMiddleware
	 * @returns True or False
	 */
	static async verifyUser(req, res, next) {
		req.user._id === req.campaign.creatorId
			? errorResponse(req, res, {
					status: 403,
					message: USER_CHAIN_ERROR,
			  })
			: next();
	}

	/**
	 * Check if user is eligible to chain a campaign
	 * @static verifyUserEligibity
	 * @memberof CampaignMiddleware
	 * @return
	 */
	static async verifyChainAmbEligibity(req, res, next) {
		const data = await findUserByEmail(req.user.email);
		const user = Helper.checkEmptyArray(data);

		const campaign = Helper.searchArray(
			user.campaigns,
			req.campaign._id,
		);

		if (campaign) {
			errorResponse(req, res, {
				status: 404,
				message: CHAINAMB_CHAIN_ERROR,
			});
		} else {
			req.user = user;
			next();
		}
	}
}

module.exports = CampaignMiddleware;
