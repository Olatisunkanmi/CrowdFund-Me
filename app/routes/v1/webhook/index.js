const router = require('express').Router();
const { WebhookController } = require('../../../controllers');
const { WebhookMiddleware } = require('../../../middleware');

const {
	sendNotificationMail,
	sendStripeNotificationMail,
	verifyPaystackHeader,
	verifyStripeHeader,
} = WebhookMiddleware;
const { WebhookResponse } = WebhookController;

router.post(
	'/paystack',
	verifyPaystackHeader,
	WebhookResponse,
	sendNotificationMail,
);

router.post(
	'/stripe',
	verifyStripeHeader,
	sendStripeNotificationMail,
	WebhookResponse,
);

module.exports = router;
