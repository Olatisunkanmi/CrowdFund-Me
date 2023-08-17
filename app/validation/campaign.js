const Joi = require("joi");
const { ValidationHelper, constants } = require("../utils");

const { CAMPAIGN_CATEGORIES } = constants;

const { validateString, validateNumber, validateEnums } = ValidationHelper;

const validateCampaign = Joi.object({
  title: validateString("Campaign Title", Joi),
  desc: validateString("Campaign Description", Joi),
  type: validateEnums(["private", "public"], "Campaign Type", Joi),
  location: validateString("Campaign location", Joi),
  target: validateNumber("Campaign Target", Joi),
  category: validateEnums(CAMPAIGN_CATEGORIES, "Campaign Category", Joi),
  currency: validateString("Campaigns currency", Joi),
});

module.exports = validateCampaign;
