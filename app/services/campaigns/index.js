const { CampaignSchema } = require('../../model/schema');

/**
 * contains a collect of service methods for managing campaigns resource on the app
 * @class CampaignsService
 */

class CampaignService {
	/**
	 * finds Campaign by id
	 * @static
	 * @param { String } Id -  Camapign Id to query for.
	 * @memberof CampaignService
	 * @returns { Promise<Array<Campaign> | Error>} - A promise that resolves or rejects with the user resource or DB error
	 */
	static async findCampaignById(id) {
		return await CampaignSchema.find({ _id: id });
	}

	/**
	 * Returns a list of all campaigns in the DB
	 * @static
	 * @memberof CampaignServices
	 */
	static async fetchCampaigns() {
		return await CampaignSchema.find();
	}
}

module.exports = CampaignService;
