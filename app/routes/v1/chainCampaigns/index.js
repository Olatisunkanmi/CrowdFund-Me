const router = require("express").Router();
const { validateCampaign } = require("../../../validation");
const {
  CampaignController,
  ChainCampaignController,
} = require("../../../controllers");
const {
  CampaignMiddleware,
  AuthenticateMiddleware,
  chainCampaignMiddleware,
  UserMiddleware,
} = require("../../../middleware");

const { fetchUserById } = UserMiddleware;
const { authenticate } = AuthenticateMiddleware;
const { findCampaignById, verifyCampaignStatus } = CampaignMiddleware;
const {
  verifyChainAmbEligibity,
  restrictCreator,
  isChainEnabled,
  createChainCampaignOptions,
  getAllChainCampaignsByUser,
  getAllChainCampaigns,
} = chainCampaignMiddleware;
const { chainCampaign, fetchChainedCampaigns } = ChainCampaignController;

//routes

router.get("/", getAllChainCampaigns, fetchChainedCampaigns);

router.use(authenticate);

router.post(
  "/:id",
  findCampaignById,
  verifyCampaignStatus,
  isChainEnabled,
  restrictCreator,
  verifyChainAmbEligibity,
  createChainCampaignOptions,
  chainCampaign,
);

router.get(
  "/:id",
  fetchUserById,
  getAllChainCampaignsByUser,
  fetchChainedCampaigns,
);

module.exports = router;
