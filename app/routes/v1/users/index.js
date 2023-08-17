const router = require("express").Router();
const { UserController } = require("../../../controllers");
const { UserMiddleware, AuthMiddleware } = require("../../../middleware");

const { createUser, fetchUser } = UserController;
const { fetchUserById, fetchAllUsers } = UserMiddleware;

router.get("/:id", fetchUserById, fetchUser);

router.get("/", fetchAllUsers, fetchUser);

module.exports = router;
