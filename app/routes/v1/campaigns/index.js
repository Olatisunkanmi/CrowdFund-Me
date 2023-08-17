const router = require("express").Router();
const { validateCampaign } = require("../../../validation");
const { CampaignController } = require("../../../controllers");
const {
  CampaignMiddleware,
  ValidationMiddleware,
  AuthenticateMiddleware,
  UserMiddleware,
} = require("../../../middleware");

const {
  refrenceUser,
  findCampaignById,
  verifyUser,
  verifyChainAmbEligibity,
  validateCampaignTitle,
  fetchCampaignsByUserId,
  fetchAllCampaigns,
  deleteCampaign,
  restrictCreator,
  attachCampaignQueries,
  verifyCampaignStatus,
  isChainEnabled,
  createChainCampaignOptions,
} = CampaignMiddleware;
const { fetchUserById } = UserMiddleware;
const { createCampaign, chainCampaign, fetchCampaigns } = CampaignController;

const { authenticate } = AuthenticateMiddleware;
const { validate } = ValidationMiddleware;

router.get("/", fetchAllCampaigns, fetchCampaigns);

// router.get('/user/:id', fetchUserById, fetchCampaignsByUserId, fetchCampaigns)');
router.get("/:id", findCampaignById, fetchCampaigns);

router.use(authenticate);
router.post(
  "/start",
  validate(validateCampaign),
  validateCampaignTitle,
  refrenceUser,
  attachCampaignQueries,
  createCampaign,
);

router.get("/user-campaigns", fetchCampaignsByUserId, fetchCampaigns);

router.delete(
  "/:id",
  findCampaignById,
  verifyUser,
  deleteCampaign,
  fetchCampaigns,
);

// router.put(
// 	'deactivate/:id',
// 	findCampaignById,
// 	verifyUser,
// 	deactivateCampaign,
// );

module.exports = router;
