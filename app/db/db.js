const mongoose = require('mongoose');
const config = require('../../config');

const DB = config.DATABASE_URL;

const ChainFundItDb = () => {
	return mongoose
		.connect(DB, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		})
		.then(console.log('DB connected'));
};

module.exports = { ChainFundItDb };
