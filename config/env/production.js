const dotenv = require("dotenv").config();

module.exports = {
  REMOTE_DB_URL: process.env.REMOTE_SQL_URL,

  DATABASE_URL: process.env.CHAINFUNDIT_URI,

  SECRET_KEY: process.env.token_Id,

  SECRET_EXPIRES: process.env.token_expiresIn,

  PAYSTACK_HASH: process.env.PAYSTACK_HASH,

  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

  CHAINFOUNDATION_PAYPAL_SECRET_KEY:
    process.env.CHAINFOUNDATION_PAYPAL_SECRET_KEY,

  CHAINFOUNDATION_PAYPAL_CLIENT_ID:
    process.env.CHAINFOUNDATION_PAYPAL_CLIENT_ID,

  CHAINFOUNDATION_PAYPAL_ACCESS_TOKEN:
    process.env.CHAINFOUNDATION_PAYPAL_ACCESS_TOKEN,

  EMAIL_TEST_ID: process.env.EMAIL_TEST_USER,

  EMAIL_TEST_PSW: process.env.EMAIL_TEST_PSW,

  EMAIL_RECEIVER: process.env.EMAIL_RECEIVER_PROD,

  EMAIL_SENDER: process.env.EMAIL_SENDER,

  EMAIL_SERVICE: process.env.EMAIL_SERVICE,

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_SUBJECT: process.env.EMAIL_SUBJECT,
};
