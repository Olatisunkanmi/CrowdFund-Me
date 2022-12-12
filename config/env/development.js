const dotenv = require('dotenv').config();
module.exports = {
	DATABASE_URL: process.env.CHAINFUNDIT_URI,
	PAYSTACK_URI: process.env.PAYSTACK_URI,
	PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
};
