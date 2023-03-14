const { loggers } = require('winston');
const { Helper, ApiError } = require('../../utils');

const {
	checkEmptyObject,
	setDate,
	convertDateToIso,
	convertDateToEpoch,
	errorResponse,
} = Helper;
/**
 *  A Middleware function for route params
 * @class - Route Params
 */
class Routeparams {
	/**
	 * Set default params
	 * @static
	 * @memberof Route-Params
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
					message: 'Error in date formats, Please check',
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
		const excludedFields = [
			'page',
			'sort',
			'limit',
			'fields',
			'from',
			'to',
		];
		excludedFields.forEach((el) => delete queryObj[el]);

		let query = data.filter((el) => {
			return Object.keys(queryObj).every(
				(key) => el[key] === queryObj[key],
			);
		});

		req.transactions = query;
		next();
	}
}

module.exports = Routeparams;
