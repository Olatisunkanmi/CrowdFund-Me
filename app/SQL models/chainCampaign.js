const conn = require("../sql");
const Model = require("./default");
const db = conn.promise();
const { chainCampaigns } = require("../sql/queries");
const { Helper } = require("../utils");
const { CampaignService } = require("../services");

const { createChainCampaign, findChainCampaignById } = chainCampaigns;

/**
 * Class method for Chained CampaignModels
 * @class Chained CampaignModel
 */

class ChainCampaignModel extends Model {
  constructor(options) {
    super(options);
    this.id = Helper.generateID();
    this.campaign_id = options.campaign_id;
    this.creator_id = options.creator_id;
    this.created_by = options.created_by;
    this.creator_email = options.creator_email;
    this.ambassador_id = options.ambassador_id;
    this.parent_raised = options.raised;
    this.commission = options.commission;
    this.chain_raised = 0;
    this.createQuery = createChainCampaign;
    this.findQuery = findChainCampaignById;
  }

  async save() {
    try {
      await db.beginTransaction();
      await db.execute(this.createQuery, [
        this.id,
        this.title,
        this.description,
        this.currency,
        this.category,
        this.target,
        this.chain_raised,
        this.parent_raised,
        this.location,
        this.commission,
        this.campaign_id,
        this.creator_id,
        this.creator_email,
        this.created_by,
        this.ambassador_id,
      ]);
      await db.commit();
      const [data] = await db.execute(this.findQuery, [this.id]);
      return Helper.checkEmptyArray(data);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ChainCampaignModel;
