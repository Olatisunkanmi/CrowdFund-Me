const { appConfig, Logger } = require('./config');
// const { appConfig } = config;

global.logger = Logger.createLogger({ label: 'CHAINFUNDIT API' });

const express = require('express');

logger.info('text info');
logger.warn('text warn');
logger.error('text error');
logger.debug('text debug');

const app = express();

appConfig(app);

module.exports = app;
