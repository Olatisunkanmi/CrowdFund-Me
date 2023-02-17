const mongoose = require('mongoose');
const { Schema } = mongoose;

const campaignSchema = new Schema({
	_id: String,
	title: String,
	desc: String,
	target: Number,
	raised: Number,
	beneiciary: Number,
	createdBy: String,
	type: String,
	creatorId: String,
	currency: String,
	status: String,
	campaign_type: String,
	commission: Number,
	chainAmb: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

module.exports = mongoose.model('Campaigns', campaignSchema);
