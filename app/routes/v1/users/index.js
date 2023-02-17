const router = require('express').Router();

router.get('/', () => {
	logger.info('Hello');
});

module.exports = router;
