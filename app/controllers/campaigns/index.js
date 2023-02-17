const { CampaignModel } = require('../../model');
const { CampaignMiddleware } = require('../../middleware');
const { UserService, CampaignService } = require('../../services');
const { Helper, constants } = require('../../utils');

const { successResponse } = Helper;
const { CHAIN_SUCCESS } = constants;

const { fetchCampaigns } = CampaignService;
const { populateUserwithCampaign, concatUser } = UserService;

/**
 * A collection of controller methods for campaigns
 * @class CampaignController
 */

class CampaignController {
	/**
	 * creates a campaign in the DB
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @memberof CampaignController
	 * @param { JSON } - A  JSON object of the newly created campaign
	 */
	static async createCampaign(req, res) {
		try {
			const campaignModel = new CampaignModel(req.options);

			await populateUserwithCampaign(req.user.email, campaignModel);

			await campaignModel.save();

			successResponse(res, { data: campaignModel });
		} catch (e) {
			throw e;
		}
	}

	/**
	 * chain a campaign to a chainAmb's object
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @memberof CampaignController
	 * @param { JSON } - A  JSON object of the newly created campaign
	 */
	static async chainCampaign(req, res) {
		req.user = concatUser(req.user, req.campaign._id);

		await req.user.save();

		successResponse(res, { message: CHAIN_SUCCESS, code: 200 });
	}

	/**
	 * Fetch all campaigns
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignController
	 * @param { Array } - An array of  objects
	 */
	static async fetchCampaigns(req, res) {
		const campaigns = await fetchCampaigns();

		successResponse(res, { data: campaigns });
	}
}

module.exports = CampaignController;
