const { Helper, constants } = require('../../utils');
const { ChainCampaignService } = require('../../services');
const { errorResponse } = Helper;

const { NO_CHAINED_CAMPAIGNS, USER_CHAIN_ERROR, NOT_ALLOWED } =
	constants;
const { fetchChainedCampaignsByUser, fetchAllChainedCampaigns } =
	ChainCampaignService;

/**
 * @class chainCampaignMiddleware
 */

class chainCampaignMiddleware {
	/**
	 * Check if user is eligible to chain a campaign
	 * @static verifyUserEligibity
	 * @memberof CampaignMiddleware
	 * @return
	 */
	static async verifyChainAmbEligibity(req, res, next) {
		const { id } = req.user;
		const { title } = req.campaigns;
		const data = await fetchChainedCampaignsByTitle(title);
		const truthy = Helper.searchArray(data, id);
		const user = data.find((item) => item.user_id === id);
		next();
	}

	/**
	 * Restricts user from chaining a campaign they created
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 */
	static async restrictCreator(req, res, next) {
		req.user.id === req.campaigns.creator_id
			? errorResponse(req, res, {
					status: 409,
					message: USER_CHAIN_ERROR,
			  })
			: next();
	}

	static async isChainEnabled(req, res, next) {
		req.campaigns.chain_enabled === 0
			? errorResponse(req, res, {
					status: 409,
					message: CHAIN_NOT_ALLOWED,
			  })
			: next();
	}

	verifyChainCreator(req, res, next) {
		req.user.id === req.campaigns.creator_id
			? next()
			: errorResponse(req, res, {
					status: 409,
					message: NOT_ALLOWED,
			  });
	}

	static async createChainCampaignOptions(req, res, next) {
		const { id, ...campaign } = req.campaigns;

		const options = {
			ambassador_id: req.user.id,
			creator_id: id,
			campaign_id: req.campaigns.id,
			...campaign,
		};

		req.options = options;
		next();
	}

	static async getAllChainCampaignsByUser(req, res, next) {
		const id = req.user.id;
		const data = await fetchChainedCampaignsByUser(id);

		req.chainedCampaigns = data;

		data.length === 0
			? errorResponse(req, res, {
					status: 404,
					message: NO_CHAINED_CAMPAIGNS,
			  })
			: next();
	}

	static async getAllChainCampaigns(req, res, next) {
		const data = await fetchAllChainedCampaigns();

		req.chainedCampaigns = data;

		data.length === 0
			? errorResponse(req, res, {
					status: 404,
					message: NO_CHAINED_CAMPAIGNS,
			  })
			: next();
	}
}

module.exports = chainCampaignMiddleware;
