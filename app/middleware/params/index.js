const { Helper, ApiError } = require("../../utils");
const fs = require("fs");
const config = require("../../../config/env");
// console.log(config.rootPath);

const {
  checkEmptyObject,
  setDate,
  convertDateToIso,
  convertDateToEpoch,
  errorResponse,
} = Helper;
/**
 *  A Middleware function for route params
 * @class routeParams
 */
class routeParams {
  /**
   * Set default params
   * @static
   * @memberof routeParams
   */
  static async setQuery(req, res, next) {
    const { from, to } = req.query;

    if (!from || !to) {
      const { from, to } = setDate();
      const { start_ISO, end_ISO } = convertDateToIso(from, to);

      req.query = {
        start: {
          epoch_time: from,
          iso_time: start_ISO,
        },
        end: {
          epoch_time: to,
          iso_time: end_ISO,
        },
      };

      console.log(req.query);
      req.query;
      next();
    }

    if (from && to) {
      const { start_ISO, end_ISO } = convertDateToIso(from, to);

      req.query = {
        start: {
          epoch_time: from,
          iso_time: start_ISO,
        },
        end: {
          epoch_time: to,
          iso_time: end_ISO,
        },
      };

      console.log(req.query);
      req.query;
      next();
    }

    if (from > to) {
      errorResponse(
        req,
        res,
        new ApiError({
          message: "Error in date formats, Please check",
          status: 401,
        }),
      );
    }
  }

  /**
   * @static
   */
  static QueryRoute(req, res, next) {
    const data = req.transactions;

    //1. Filter query
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields", "from", "to"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = data.filter((el) => {
      return Object.keys(queryObj).every((key) => el[key] === queryObj[key]);
    });

    req.transactions = query;
    next();
  }

  static writeToFile(req, res, next) {
    const data = req.transactions;
    const trans = data.transaction_list;
    const tme = Helper.curTime();
    // Extract headers from first object in array
    const headers = Object.keys(data.transaction_list[0]);
    // console.log(headers);

    //convert data to csv
    // Convert data to array of arrays
    // const dataArray = trans.map((obj) =>
    // 	headers.map((key) => obj[key]),
    // );

    const dataArray = trans.map(function (obj) {
      return headers.map(function (key) {
        return obj[key];
      });
    });

    // Insert headers as first row of data
    dataArray.unshift(headers);

    // Convert data to CSV format
    const csvData = dataArray.map((row) => row.join(",")).join("\n");

    // console.log(csvData);

    //write to file
    // Write CSV data to file
    // fs.writeFile(
    // 	`${config.rootPath}/logs/All Donations.csv`,
    // 	csvData,
    // 	(err) => {
    // 		if (err) throw err;
    // 		console.log('Data written to file');
    // 	},
    // );
    logger.error("Data written to file");
    const xTme = Helper.curTime();
    Helper.fnPerformance(tme, xTme);
    next();
  }
}

module.exports = routeParams;
