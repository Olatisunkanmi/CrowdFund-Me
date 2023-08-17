const router = require("express").Router();
const { UserController, AuthController } = require("../../../controllers");
const {
  validateUserSchema,
  validateUserSignIn,
} = require("../../../validation");
const {
  ValidationMiddleware,
  AuthenticateMiddleware,
  AuthMiddleware,
  UserMiddleware,
} = require("../../../middleware");

const { validateLoginEmail } = AuthMiddleware;
const { signIn } = AuthController;
const { comparePassword } = AuthenticateMiddleware;
const { validateUserEmail } = UserMiddleware;
const { createUser } = UserController;
const { validate } = ValidationMiddleware;

router.post(
  "/signup",
  validate(validateUserSchema),
  validateUserEmail,
  // createUser,
);

router.post(
  "/signin",
  validate(validateUserSignIn),
  validateLoginEmail,
  comparePassword,
  signIn,
);

module.exports = router;
