const router = require("express").Router();
const transaction = require("./transactions");
const user = require("./users");
const auth = require("./auth");
const campaign = require("./campaigns");

router.use("/auth", auth);
router.use("/transactions", transaction);
router.use("/users", user);
router.use("/campaigns", campaign);
router.use("/webhook", require("./webhook"));
router.use("/chain-campaigns", require("./chainCampaigns"));

module.exports = router;
