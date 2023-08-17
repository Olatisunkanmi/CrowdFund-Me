const router = require("express").Router();
const { TransactionController } = require("../../../../controllers");
const {
  TransactionMiddleware,
  CampaignMiddleware,
  ParamsMiddleware,
  AuthenticateMiddleware,
  ValidationMiddleware,
} = require("../../../../middleware");
const { validateCard } = require("../../../../validation");
const { authenticate } = AuthenticateMiddleware;
const { validate } = ValidationMiddleware;
const { setQuery, QueryRoute, writeToFile } = ParamsMiddleware;
const { findCampaignById } = CampaignMiddleware;

const { TransactionBalance, TransactionHistory, Transactions } =
  TransactionController;

const { fetchTransactions, calculateTransactionNet } = TransactionMiddleware;

router.get(
  "/",
  setQuery,
  fetchTransactions,
  // QueryRoute,
  calculateTransactionNet,
  writeToFile,
  Transactions,
);

// router.get('/dedicated-virtual-accouts' ,fetchDedicatedAccounts) ;

// router.get('/balance', fetchTransactionBalance, TransactionBalance);

// router.get('/latest', setQuery, fetchGiftAidDonations, Transactions);

module.exports = router;
