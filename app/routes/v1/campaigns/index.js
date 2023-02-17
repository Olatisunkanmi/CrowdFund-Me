const router = require('express').Router();
const { validateCampaign } = require('../../../validation');
const { CampaignController } = require('../../../controllers');
const {
	CampaignMiddleware,
	ValidationMiddleware,
	AuthenticateMiddleware,
} = require('../../../middleware');

const {
	refrenceUser,
	findCampaignById,
	verifyUser,
	verifyChainAmbEligibity,
} = CampaignMiddleware;

const { createCampaign, chainCampaign, fetchCampaigns } =
	CampaignController;

const { authenticate } = AuthenticateMiddleware;
const { validate } = ValidationMiddleware;

router.use(authenticate);

router.get('/', fetchCampaigns);

router.post(
	'/start',
	validate(validateCampaign),
	refrenceUser,
	createCampaign,
);

// router.get('/:id',  )

router.post(
	'/chain/:id',
	findCampaignById,
	verifyUser,
	verifyChainAmbEligibity,
	chainCampaign,
);

// router.patch('/:id')

module.exports = router;
