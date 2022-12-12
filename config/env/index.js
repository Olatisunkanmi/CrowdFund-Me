const development = require('./development');
const dotenv = require('dotenv');
dotenv.config();

const { NODE_ENV } = process.env;

const currentEnv = {
	development,
}[NODE_ENV || 'development'];

module.exports = {
	...currentEnv,
};
