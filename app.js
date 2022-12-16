const { appConfig } = require('./config');
// const { appConfig } = config;

const express = require('express');

const app = express();

appConfig(app);

module.exports = app;
