const router = require('express').Router();
const { TransactionController } = require('../../../controllers');
const { TransactionMiddleware } = require('../../../middleware');

const { TransactionBalance, TransactionHistory, TransactionsbyDate } =
	TransactionController;
const {
	fetchTransactionBalance,
	fetchTransactionHistory,
	fetchAllTransactions,
	fetchTransactionbyDate,
} = TransactionMiddleware;

router.get('/balance', fetchTransactionBalance, TransactionBalance);

router.get(
	'/top-history',
	fetchTransactionHistory,
	TransactionHistory,
);

// router.get('/generate', fetchAllTransactions);

router.get(
	'/get-transactions-by-date',
	fetchTransactionbyDate,
	TransactionsbyDate,
);
module.exports = router;
