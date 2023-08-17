const { CampaignModel } = require("../../SQL models");
const { UserService, CampaignService } = require("../../services");
const { Helper, constants, ApiError } = require("../../utils");

const { successResponse, errorResponse } = Helper;
const {
  CHAIN_SUCCESS,
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  CAMPAIGN_TITLE_EXIST,
  CREATE_CAMPAIGN_ERROR,
  CAMPAIGN_CREATED,
} = constants;

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
      const campaignModel = new CampaignModel({
        ...req.options,
      });
      const data = await campaignModel.save();
      successResponse(res, { message: CAMPAIGN_CREATED, data: data });
    } catch (e) {
      Helper.apiErrLogMessager(e, req);
      errorResponse(
        req,
        res,
        new ApiError({ status: 401, message: CREATE_CAMPAIGN_ERROR }),
      );
    }
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
    const data = req.campaigns;

    successResponse(res, { data: data });
  }
}

module.exports = CampaignController;
