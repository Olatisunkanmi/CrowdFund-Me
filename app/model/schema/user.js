const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
	id: mongoose.Schema.Types.ObjectId,
	first_name: String,
	last_name: String,
	email: String,
	user_type: String,
	password: String,
	confirm_password: String,
	balance_ngn: Number,
	balance_usd: Number,
	balance_gbp: Number,
	no_of_campaigns: Number,
	campaigns: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Campaigns',
		},
	],
	__v: { select: false },
});

module.exports = mongoose.model('User', userSchema);
