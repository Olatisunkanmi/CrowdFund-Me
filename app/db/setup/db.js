const mongoose = require('mongoose');
const { config } = require('../../../config');
const { constants } = require('../../utils');

const { DB_SUCCESS } = constants;

const DB = config.DATABASE_URL;

const ChainFundItDb = () => {
	mongoose.set('strictQuery', true);
	return mongoose
		.connect(DB)
		.then(logger.info(DB_SUCCESS))
		.catch((e) => logger.warn(e.message));
};

module.exports = { ChainFundItDb };
