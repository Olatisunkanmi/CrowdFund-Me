const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	payStackId: {
		type: Number,
		unique: false,
	},
	stripeId: {
		type: Number,
		unique: false,
	},
	firstName: {
		type: String,
		required: [false, 'User must have First name'],
	},
	lastName: {
		type: String,
		required: [false, 'User must have Last Name '],
	},
	phone: {
		type: String,
		required: [false, 'User must have a Phone Number '],
	},
	email: {
		type: String,
		required: [false, 'User must have an Email address'],
		unique: false,
		validate: [validator.isEmail, 'Enter a valid Email address'],
	},
	amount_raised_GP: {
		type: Number,
		default: 0,
	},
	amount_raised_NG: {
		type: Number,
		default: 0,
	},
	__v: {
		type: Number,
		select: false,
	},
	profilePicture: {
		type: String,
		default: '',
	},
	created_at: {
		type: Date,
	},
	updated_at: {
		type: Date,
	},
});

// UserSchema.pre('save', function (next) {});

module.exports = mongoose.model('User', UserSchema);
