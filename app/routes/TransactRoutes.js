const router = require('express').Router();
const {
	getPayStackTransactionsList,
	getAllTransactionsPecentage,
	createUser,
	getUserDB,
} = require('../controllers/TransactionCtr');

//
router.route('/').get(getPayStackTransactionsList);

router.route('/generate/').get(getAllTransactionsPecentage);

router.route('/users').get(getUserDB);

// Create Users according with payStackId
router.route('/').post(createUser);

module.exports = router;
