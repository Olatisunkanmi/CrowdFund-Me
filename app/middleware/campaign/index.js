const { Helper, constants, ApiError } = require('../../utils');
const { UserService, CampaignService } = require('../../services');
const queries = require('../../sql/queries');
const { campaigns } = queries;
const { findUserByEmail } = UserService;
const {
	findCampaignById,
	findCampaignByTitle,
	findCampaignsByCreatorId,
	findAllCampaigns,
	deleteCampaignById,
} = CampaignService;
const { errorResponse } = Helper;
const {
	USER_CHAIN_ERROR,
	CHAINAMB_CHAIN_ERROR,
	FETCH_CAMPAIGN_ERROR,
	CAMPAIGN_TITLE_EXIST,
	CAMPAIGNS_NIL,
	CAMPAIGN_NOT_FOUND,
	NOT_ALLOWED,
	CAMPAIGN_NOT_ACTIVE,
	CHAIN_NOT_ALLOWED,
} = constants;

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
		const { first_name, last_name, id, email } = req.user;

		const options = {
			creatorName: `${first_name} ${last_name}`,
			creatorEmail: email,
			userId: id,
			...req.body,
		};

		req.options = options;
		next();
	}

	/**
	 * fetches campaign by ID from database
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 * @returns { JSON } - A Json object of the user with the newly populated campaign
	 */
	static async findCampaignById(req, res, next) {
		try {
			const data = await findCampaignById(req.params.id);
			const campaign = Helper.checkEmptyArray(data);

			req.campaigns = campaign;

			campaign
				? next()
				: errorResponse(req, res, {
						status: 404,
						message: CAMPAIGN_NOT_FOUND,
				  });
		} catch (e) {
			Helper.apiErrLogMessager(e, req);
			errorResponse(
				req,
				res,
				new ApiError({ status: 401, message: FETCH_CAMPAIGN_ERROR }),
			);
		}
	}

	/**
	 *Validates campaign title to ensure it is unique
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 * @returns { JSON } - A Json object of the user with the newly populated campaign
	 */
	static async validateCampaignTitle(req, res, next) {
		const data = await findCampaignByTitle(req.body.title);
		const campaign = Helper.checkEmptyArray(data);
		campaign
			? errorResponse(req, res, {
					status: 409,
					message: CAMPAIGN_TITLE_EXIST,
			  })
			: next();
	}

	/**
	 * Checks user object for campaign
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 * @returns True or False
	 */
	static async verifyUser(req, res, next) {
		req.user.id === req.campaigns.creator_id
			? next()
			: errorResponse(req, res, {
					status: 409,
					message: NOT_ALLOWED,
			  });
	}

	/**
	 * Checks for all campaigns by a user
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 * @returns {JSON || Null } - returns a Json object of the campaign with a unique ID or Nulll if failed
	 */
	static async fetchCampaignsByUserId(req, res, next) {
		try {
			const id = req.user.id;
			const data = await findCampaignsByCreatorId(id);

			req.campaigns = data;

			data.length === 0
				? errorResponse(req, res, {
						status: 404,
						message: CAMPAIGNS_NIL,
				  })
				: next();
		} catch (e) {
			Helper.apiErrLogMessager(e, req);
			errorResponse(req, res, {
				status: 404,
				message: FETCH_CAMPAIGN_ERROR,
			});
		}
	}

	/**
	 * Checks for all campaigns
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 * @returns {JSON || Null } - returns a Json object of the campaign with a unique ID or Nulll if failed
	 */
	static async fetchAllCampaigns(req, res, next) {
		try {
			const data = await findAllCampaigns();
			req.campaigns = data;

			data.length === 0
				? errorResponse(req, res, {
						status: 404,
						message: CAMPAIGNS_NIL,
				  })
				: next();
		} catch (e) {
			Helper.apiErrLogMessager(e, req);
			errorResponse(req, res, {
				status: 404,
				message: FETCH_CAMPAIGN_ERROR,
			});
		}
	}

	/**
	 * Deletes a campaign by ID
	 * @static
	 * @param { Object } req -  The request from the endpoint
	 * @param { Object } res - The response object returned by the method
	 * @param {Next} next -calls the next handler
	 * @memberof CampaignMiddleware
	 * @returns {JSON || Null } - returns a Json object of the campaign with a unique ID or Nulll if failed
	 */
	static async deleteCampaign(req, res, next) {
		try {
			const data = await deleteCampaignById(req.campaigns.id);
			req.campaigns = [];
			next();
		} catch (e) {
			Helper.apiErrLogMessager(e, req);
			errorResponse(
				req,
				res,
				new ApiError({ status: 401, message: FETCH_CAMPAIGN_ERROR }),
			);
		}
	}

	static async verifyCampaignStatus(req, res, next) {
		req.campaigns.status === 'active'
			? next()
			: errorResponse(req, res, {
					status: 409,
					message: CAMPAIGN_NOT_ACTIVE,
			  });
	}

	static attachCampaignQueries(req, res, next) {
		const data = req.options;

		const options = {
			createCampaignQuery: campaigns.createCampaign,
			findCampaignQuery: campaigns.findCampaignById,
			...data,
		};

		req.options = options;

		next();
	}
}

module.exports = CampaignMiddleware;
