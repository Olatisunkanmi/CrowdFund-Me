const { loggers } = require('winston');
const { Helper } = require('../../utils');

const { checkEmptyObject } = Helper;
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
		if (checkEmptyObject(req.query)) {
			let start = new Date(Date.now());

			let end = new Date(start);
			end.setDate(start.getDate() - 30);

			req.query = { start, end };

			return next();
		}
		next();
	}
}

module.exports = Routeparams;
