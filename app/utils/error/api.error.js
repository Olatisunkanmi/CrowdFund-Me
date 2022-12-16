const ModuleError = require('./module.error');
const constants = require('../constants');

const { INTERNAL_SERVER_ERROR } = constants;

/**
 * @class ApiError
 *
 */
module.exports = class ApiError extends ModuleError {
	/**
	 * The ApiError Constructor.
	 * @param {Object} options - A configuration object for errors.
	 * @param {String} options.message - The error message if any.
	 * @param {Number} options.status - The status code of error if any.
	 * @param {Array} options.errors - Additional error details if any.
	 * @constructor ApiError
	 */
	constructor(options = {}) {
		super(options);
		this.name = this.constructor.name;
		this.message = options.message || INTERNAL_SERVER_ERROR;
		this.status = options.status || 500;
	}
};
