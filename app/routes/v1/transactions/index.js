const router = require('express').Router();
const { TransactionController } = require('../../../controllers');
const {
	TransactionMiddleware,
	ParamsMiddleware,
} = require('../../../middleware');

const { setQuery } = ParamsMiddleware;

const { TransactionBalance, TransactionHistory, Transactions } =
	TransactionController;

const {
	fetchTransactionBalance,
	fetchGiftAidDonations,
	fetchTransactions,
} = TransactionMiddleware;

router.get('/', setQuery, fetchTransactions, Transactions);

// router.get('/dedicated-virtual-accouts' fetchDedicatedAccounts) ;

router.get('/balance', fetchTransactionBalance, TransactionBalance);

router.get('/latest', setQuery, fetchGiftAidDonations, Transactions);

module.exports = router;
