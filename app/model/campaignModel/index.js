const { Helper } = require('../../utils');
const { CampaignSchema } = require('../schema');

const { errorResponse } = Helper;
/**
 * Class method for campaignModels
 * @class CampaignModel
 */

class CampaignModel {
	constructor(options) {
		// this._id = options._id || Helper.generateID();
		this.title = options.title;
		this.desc = options.desc;
		this.target = options.target;
		this.createdBy = options.createdBy;
		this.category = options.category;
		this.status = 'Live';
		this.creatorId = options.userID;
		this.currency = options.currency;
		this.commission = options.commission;
	}

	async save() {
		try {
			const Campaign = await new CampaignSchema({
				_id: this._id,
				title: this.title,
				desc: this.desc,
				target: this.target,
				createdBy: this.createdBy,
				creatorId: this.creatorId,
				currency: this.currency,
				commission: this.commission,
			});

			return await Campaign.save();
		} catch (e) {
			throw e;
		}
	}
}

module.exports = CampaignModel;
