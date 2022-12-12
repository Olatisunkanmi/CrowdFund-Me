const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
	transaction_No: {
		type: Number,
		default: 0,
	},

	amount_raised: {
		type: Number,
		default: 0,
	},
	__v: {
		type: Number,
		select: false,
	},

	updated_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Admin', AdminSchema);
