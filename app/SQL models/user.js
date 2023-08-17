const conn = require("../sql/setup");
const db = conn.promise();
const queries = require("../sql/queries/user");
const { UserService } = require("../services");
const { Helper } = require("../utils");

const { findUserById, findUserByEmail } = UserService;
const { createUser, fetchUserById } = queries;

/**
 * Class method for UserModel
 * @class UserModel
 */
class UserModel {
  constructor(options) {
    this.id = Helper.generateID();
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.email = options.email;
    this.user_type = options.user_type;
    this.password = Helper.hashPassword(options.password);
    this.confirm_password = Helper.hashPassword(options.confirm_password);
    this.balance_ngn = options.balance_ngn ? options.balance_ngn : 0;
    this.balance_usd = options.balance_usd ? options.balance_usd : 0;
    this.balance_gbp = options.balance_gbp ? options.balance_gbp : 0;
    this.no_of_campaigns = options.no_of_campaigns
      ? options.no_of_campaigns
      : 0;
    // this.created_at = Math.round(Helper.getDate() / 1000);
  }

  async save() {
    console.log(this);
    try {
      await db.beginTransaction();
      await db.execute(createUser, [
        this.id,
        this.first_name,
        this.last_name,
        this.email,
        this.user_type,
        this.password,
        this.confirm_password,
        this.balance_ngn,
        this.balance_usd,
        this.balance_gbp,
        this.no_of_campaigns,
      ]);
      await db.commit();
      const data = await findUserById(this.id);
      return data;
    } catch (e) {
      await db.rollback();
      throw e;
    }
  }
}

module.exports = UserModel;
