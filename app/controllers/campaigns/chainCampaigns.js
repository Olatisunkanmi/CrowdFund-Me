const { Helper, constants, ApiError } = require('../../utils');
const { ChainCampaignModel } = require('../../SQL models');
const { FETCH_CAMPAIGN_ERROR } = require('../../utils/constants');
const { successResponse } = Helper;
const { CHAIN_SUCCESS, FETCH_CHAINED_CAMPAIGNS_SUCCESS } = constants;

class ChainCampaignController {
	/**
	 * chain a campaign to a chainAmb's object
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @memberof CampaignController
	 * @param { JSON } - A  JSON object of the newly created campaign
	 */
	static async chainCampaign(req, res) {
		const chainCampaignModel = new ChainCampaignModel({
			...req.options,
		});

		const data = await chainCampaignModel.save();

		successResponse(res, {
			message: CHAIN_SUCCESS,
			code: 200,
			data: data.id,
		});
	}

	static fetchChainedCampaigns(req, res) {
		const data = req.chainedCampaigns;

		successResponse(res, {
			message: FETCH_CHAINED_CAMPAIGNS_SUCCESS,
			code: 200,
			data,
		});
	}
}

module.exports = ChainCampaignController;
