const router = require('express').Router();
const transaction = require('./transactions');

router.use('/transactions', transaction);
// router.use('/user');
// router.use('/auth');

module.exports = router;
