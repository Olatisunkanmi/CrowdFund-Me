const { Helper } = require('../../utils');
const { UserSchema } = require('../schema');

/**
 * Class method for UserModel
 * @class UserModel
 */
class UserModel {
	constructor(options) {
		this.first_name = options.first_name;
		this.last_name = options.last_name;
		this.email = options.email;
		this.user_type = options.user_type;
		this.password = Helper.hashPassword(options.password);
		this.confirm_password = Helper.hashPassword(
			options.confirm_password,
		);
		this.balance_ngn = options.balance_ngn ? options.balance_ngn : 0;
		this.balance_usd = options.balance_usd ? options.balance_usd : 0;
		this.balance_gbp = options.balance_gbp ? options.balance_gbp : 0;
		this.no_of_campaigns = options.no_of_campaigns
			? options.no_of_campaigns
			: 0;
	}

	async save() {
		try {
			const User = await new UserSchema({
				first_name: this.first_name,
				last_name: this.last_name,
				email: this.email,
				user_type: this.user_type,
				password: this.password,
				confirm_password: this.confirm_password,
				balance_gbp: this.balance_gbp,
				balance_ngn: this.balance_ngn,
				balance_usd: this.balance_usd,
				no_of_campaigns: this.no_of_campaigns,
			});

			return await User.save();
		} catch (e) {
			logger.debug(e);
			throw e;
		}
	}
}

module.exports = UserModel;
