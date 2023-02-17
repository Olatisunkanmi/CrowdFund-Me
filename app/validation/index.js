const validateUserSchema = require('./user');
const validateUserSignIn = require('./auth');
const validateCampaign = require('./campaign');
const validateCard = require('./card');

module.exports = {
	validateUserSchema,
	validateUserSignIn,
	validateCampaign,
	validateCard,
};
