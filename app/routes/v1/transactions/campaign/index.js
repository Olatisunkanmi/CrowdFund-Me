const router = require('express').Router();
const { validateCard } = require('../../../../validation');
const {
	AuthenticateMiddleware,
	ValidationMiddleware,
	TransactionMiddleware,
} = require('../../../../middleware');

const { validate } = ValidationMiddleware;
const { authenticate } = AuthenticateMiddleware;
const { initCardCharge } = TransactionMiddleware;

router.use(authenticate);

router.post('/donate/:id', validate(validateCard), initCardCharge);

module.exports = router;
