const connect = require("../sql");
const db = connect.promise();
const { Helper } = require("../utils");

class Model {
  constructor(options) {
    this.id = Helper.generateID();
    this.title = options.title;
    this.description = options.desc || options.description;
    this.target = options.target;
    this.currency = options.currency;
    this.category = options.category;
    this.type = options.type;
    this.location = options.location;
    this.creator_id = options.userId;
    this.creator_email = options.creatorEmail;
    this.created_by = options.creatorName;
    this.createQuery = options.createCampaignQuery;
    this.findQuery = options.findCampaignQuery;
  }

  async save() {
    try {
      await db.beginTransaction();
      await db.execute(this.createCampaignQuery, [
        this.id,
        this.title,
        this.description,
        this.currency,
        this.category,
        this.target,
        this.type,
        this.location,
        this.creator_id,
        this.creator_email,
        this.created_by,
      ]);
      await db.commit();
      const [data] = await db.execute(this.findCampaignQuery, [this.id]);
      return Helper.checkEmptyArray(data);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Model;
