const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const AppRes = require('../utils/AppResponse');
const AppError = require('../utils/AppError');
const userModel = require('../Models/userModel');
const config = require('../../config');
const { PayStackServices } = require('../paystack/helpers');
const fs = require('fs');
const path = require('path');
const AdminModel = require('../Models/AdminModel');

const { retrieveTransactionData, retrieveCustomersList } =
	PayStackServices;

// Get List of all Trasactions from Paystack api
exports.getPayStackTransactionsList = catchAsync(
	async (req, res, next) => {
		// Make a request for a user with a given ID

		let User = await retrieveTransactionData();
		User = [...User.data.data];

		new AppRes(res, User, 200);
	},
);

// Update users balance using the paystack api
exports.getAllTransactionsPecentage = catchAsync(
	async (req, res, next) => {
		// Make a request for a user with a given ID

		let User = await retrieveTransactionData();
		User = [...User.data.data];

		for (let i = 0; i < User.length; i++) {
			const el = User[i];
			let sum = el.amount;

			sum += el.amount;
			// console.log(el.customer.email);

			const filter = { stripeId: el.customer.id };
			const update = { amount: el.amount };

			// async fn. to find User from DB by email and update with new Transaction.
			let curUser = await userModel.findOne({
				stripeId: el.customer.id,
			});

			if (!curUser) {
				console.log(el);
				console.log('`````````````````````````');
			}

			// console.log(curUser.amount_raised_NG + el.amount);
			// console.log(curUser);
			// console.log(el.amount);
			console.log('`````````````````````````');
		}
		new AppRes(res, User, 200);
	},
);

// Create Users in DB with paystack APi List.
exports.createUser = catchAsync(async (req, res, next) => {
	// Make a request for a user with a given ID

	let User = await retrieveCustomersList();
	User = [...User.data.data];
	let UserDB = [];

	for (let i = 0; i < User.length; i++) {
		const el = User[i];
		if (el.first_name === null) continue;
		if (el.first_name === '') continue;

		UserDB.push(el);
	}

	UserDB.forEach(async (el) => {
		await userModel.create({
			firstName: el.first_name,
			lastName: el.last_name,
			email: el.email,
			stripeId: el.id,
			created_at: el.createdAt,
		});
	});

	new AppRes(res, UserDB, 200);
});

exports.getUserDB = catchAsync(async (req, res, next) => {
	let users = await userModel.find();

	new AppRes(res, users, 200);
});
