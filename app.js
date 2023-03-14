const { appConfig, Logger } = require('./config');

global.logger = Logger.createLogger({ label: 'CROWDFUND ME' });

const express = require('express');

const app = express();

appConfig(app);

module.exports = app;
