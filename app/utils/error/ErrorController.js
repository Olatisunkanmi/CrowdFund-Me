const ApiError = require("./api.error");
const constant = require("../constants");
const { Helper } = require("../helpers");

const { INTERNAL_SERVER_ERROR } = constant;

const sendErrorDev = (err, res) => {
  Helper.moduleErrLogMessager(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if ((process.env.NODE_ENV = "development")) {
    let error = { ...err };

    if (err.name == "CastError ") {
      error = handleErrorDB(err);
      //
    } else if (err.code === "EADDRINUSE") {
      console.error(err.port + " is already in use");
      process.exit(1);
      //
    } else if (err.code === "EACCES") {
      console.error(err.port + " requires elevated privileges");
      process.exit(1);
    }
    sendErrorDev(err, res);
  }
};
