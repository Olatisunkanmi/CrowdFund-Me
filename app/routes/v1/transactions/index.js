const router = require('express').Router();
const { TransactionController } = require('../../../controllers');
const { TransactionMiddleware } = require('../../../middleware');

const { TransactionBalance, TransactionHistory } =
	TransactionController;
const {
	fetchTransactionBalance,
	fetchTransactionHistory,
	fetchAllTransactions,
} = TransactionMiddleware;

router.get('/balance', fetchTransactionBalance, TransactionBalance);

router.get(
	'/top-history',
	fetchTransactionHistory,
	TransactionHistory,
);

router.get('/generate', fetchAllTransactions);

module.exports = router;
