const router = require("express").Router();

const user = require("./users");
const admin = require("./admin");
const campaign = require("./campaign");

router.use("/user", user);
router.use("/admin", admin);
router.use("/campaign", campaign);

module.exports = router;
