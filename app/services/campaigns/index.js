const db = require("../../sql");
const { campaigns } = require("../../sql/queries");

const {
  findCampaignByTitle,
  findCampaignById,
  findCampaignsByCreatorId,
  fetchCampaigns,
  deleteCampaign,
} = campaigns;

/**
 * contains a collection of service methods for managing campaigns resource on the app
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
    return await new Promise((resolve, reject) => {
      db.query(findCampaignById, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  /**
   * Returns a list of all campaigns in the DB
   * @static
   * @memberof CampaignServices
   */
  static async findAllCampaigns() {
    return await new Promise((resolve, reject) => {
      db.execute(fetchCampaigns, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  /**
   * finds Campaign by title
   * @static
   * @param { String } title -  Camapign title to query for.
   * @memberof CampaignService
   * @returns { Promise<Array<Campaign> | Error>} - A promise that resolves or rejects with the user resource or DB error
   */
  static async findCampaignByTitle(title) {
    return await new Promise((resolve, reject) => {
      db.query(findCampaignByTitle, [title], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  /**
   * Finds Campaign by creator id
   * @static
   * @param { String } id -  Camapign creator id to query for.
   * @memberof CampaignService
   * @returns { Promise<Array<Campaign> | Error>} - A promise that resolves or rejects with the user resource or DB error
   */
  static async findCampaignsByCreatorId(id) {
    return await new Promise((resolve, reject) => {
      db.query(findCampaignsByCreatorId, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }

  /**
   * Deletes a campaign by id
   * @static
   * @param { String } id -  Camapign id to query for.
   * @memberof CampaignService
   * @returns { Promise<Array<Campaign> | Error>} - A promise that resolves or rejects with the user resource or DB error
   */
  static async deleteCampaignById(id) {
    return await new Promise((resolve, reject) => {
      db.query(deleteCampaign, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  }
}

module.exports = CampaignService;
