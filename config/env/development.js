const dotenv = require('dotenv').config();

module.exports = {
	DATABASE_URL: process.env.CHAINFUNDIT_URI,
	PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
	PAYPAL_SECRET_KEY: process.env.PAYPAL_SECRET_KEY,
};
