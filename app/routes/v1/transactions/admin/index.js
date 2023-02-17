const router = require('express').Router();
const { TransactionController } = require('../../../../controllers');
const {
	TransactionMiddleware,
	CampaignMiddleware,
	ParamsMiddleware,
	AuthenticateMiddleware,
	ValidationMiddleware,
} = require('../../../../middleware');
const { validateCard } = require('../../../../validation');

const { authenticate } = AuthenticateMiddleware;
const { validate } = ValidationMiddleware;
const { setQuery } = ParamsMiddleware;
const { findCampaignById } = CampaignMiddleware;

const { TransactionBalance, TransactionHistory, Transactions } =
	TransactionController;

const {
	fetchTransactionBalance,
	fetchGiftAidDonations,
	fetchTransactions,
	QueryTransactions,
	calculateTransactionNet,
} = TransactionMiddleware;

router.get(
	'/',
	fetchTransactions,
	QueryTransactions,
	setQuery,
	calculateTransactionNet,
	Transactions,
);

// router.get('/dedicated-virtual-accouts' ,fetchDedicatedAccounts) ;

router.get('/balance', fetchTransactionBalance, TransactionBalance);

router.get('/latest', setQuery, fetchGiftAidDonations, Transactions);

module.exports = router;
