const db = require('../../sql');
const { chainCampaigns } = require('../../sql/queries');

const {
	findChainCampaignByAmbassadorId,
	findChainCampaignById,
	findAllChainCampaigns,
} = chainCampaigns;

/**
 * Contains a collect of service methods for managing chained campaigns resource on the app
 * @class ChainCampaignService
 */

class ChainCampaignService {
	/**
	 * finds chained campaign by id
	 * @static
	 * @param { String } Id -  chained campaign Id to query for.
	 * @memberof ChainCampaignService
	 * @returns { Promise<Array<ChainCampaign> | Error>} - A promise that resolves or rejects with the user resource or DB error
	 */

	static async fetchChainedCampaignsByUser(id) {
		return await new Promise((resolve, reject) => {
			db.execute(
				findChainCampaignByAmbassadorId,
				[id],
				(err, results, fields) => {
					if (err) {
						reject(err);
					}
					resolve(results);
				},
			);
		});
	}

	/**
	 * finds chained campaign by id
	 * @static
	 * @param { String } Id -  chained campaign Id to query for.
	 * @memberof ChainCampaignService
	 * @returns { Promise<Array<ChainCampaign> | Error>} - A promise that resolves or rejects with the user resource or DB error
	 */

	static async fetchAllChainedCampaigns() {
		return await new Promise((resolve, reject) => {
			db.execute(findAllChainCampaigns, (err, results, fields) => {
				if (err) {
					reject(err);
				}
				resolve(results);
			});
		});
	}
}

module.exports = ChainCampaignService;
