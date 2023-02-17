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
		next();
	}
}

module.exports = Routeparams;
