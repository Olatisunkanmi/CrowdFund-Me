const router = require("express").Router();
const { validateCard } = require("../../../../validation");
const {
  AuthenticateMiddleware,
  ValidationMiddleware,
  TransactionMiddleware,
} = require("../../../../middleware");

const { validate } = ValidationMiddleware;
const { authenticate } = AuthenticateMiddleware;
const { initPaystackCardCharge, initStripeCharge } = TransactionMiddleware;

// router.use(authenticate);

router.post("paystack", validate(validateCard), initPaystackCardCharge);

router.post(
  "/stripe",
  // validate(validateCard),
  initStripeCharge,
);
module.exports = router;
