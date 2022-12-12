const { route } = require('./TransactRoutes');

const router = require('express').Router();

route.use('/admin');

module.exports = router;
