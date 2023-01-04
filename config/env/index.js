const development = require('./development');
const dotenv = require('dotenv');
const rootPath = require('app-root-path');
dotenv.config();

const { NODE_ENV } = process.env;

const currentEnv = {
	development,
}[NODE_ENV || 'development'];

module.exports = { ...currentEnv, rootPath };
