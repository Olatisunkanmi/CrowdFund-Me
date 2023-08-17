const router = require("express").Router();

router.get("/", () => {
  logger.info("userr Route");
});

module.exports = router;
