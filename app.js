const { appConfig, Logger } = require("./config");

global.logger = Logger.createLogger({ label: "CHAINFUNDIT API" });

const express = require("express");

const app = express();

appConfig(app);

module.exports = app;
