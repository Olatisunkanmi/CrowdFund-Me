const mongoose = require('mongoose');
const { config } = require('../../config');
const { constants } = require('../utils');

const { DB_SUCCESS } = constants;

const DB = config.DATABASE_URL;

const ChainFundItDb = () => {
	mongoose.set('strictQuery', true);
	return mongoose.connect(DB).then(console.log(DB_SUCCESS));
};

module.exports = { ChainFundItDb };
