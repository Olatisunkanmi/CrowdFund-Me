module.exports = {
	VIEW_TRANSACTIONS_ENDPOINT: 'https://api.paystack.co/transaction',

	VIEW_ALL_TRANSACTIONS_ENDPOINT:
		'https://api.paystack.co/transaction?status=success&perPage=50',

	VIEW_CUSTOMERS: 'https://api.paystack.co/customer',

	VIEW_TRANSACTION_TOTALS:
		'https://api.paystack.co/transaction/totals',

	VALIDATE_TRANSACTION_ENDPOINT: (REFRENCE) =>
		`https://api.paystack.co/transaction/verify/:${REFRENCE}`,

	VIEW_TRANSACTION_ENDPOINT: (REFRENCE) =>
		`https://api.paystack.co/transaction/:${REFRENCE}`,
};
