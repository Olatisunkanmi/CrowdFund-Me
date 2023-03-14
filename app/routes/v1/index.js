const router = require('express').Router();
const transaction = require('./transactions');
const user = require('./users');
const auth = require('./auth');
const campaign = require('./campaigns');
const webhook = require('./webhook');

router.use('/auth', auth);
router.use('/transactions', transaction);
router.use('/user', user);
router.use('/campaign', campaign);
router.use('/webhook', webhook);

module.exports = router;
