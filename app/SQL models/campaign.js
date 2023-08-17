const conn = require("../sql");
const Model = require("./default");
const db = conn.promise();
const { campaigns } = require("../sql/queries");
const { Helper } = require("../utils");
const { CampaignService } = require("../services");

const { findCampaignById } = CampaignService;
const { createCampaign } = campaigns;
/**
 * Class method for campaignModels
 * @class CampaignModel
 */

class CampaignModel extends Model {
  constructor(options) {
    super(options);
  }
}

module.exports = CampaignModel;
