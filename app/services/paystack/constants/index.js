module.exports = {
	VIEW_TRANSACTIONS_ENDPOINT: 'https://api.paystack.co/transaction',

	CHARGE_CARD: 'https://api.paystack.co/charge',

	VIEW_ALL_TRANSACTIONS_ENDPOINT:
		'https://api.paystack.co/transaction?perPage=500&status=success',

	VIEW_CUSTOMERS: 'https://api.paystack.co/customer',

	VIEW_TRANSACTION_TOTALS:
		'https://api.paystack.co/transaction/totals',

	VALIDATE_TRANSACTION_ENDPOINT: (REFRENCE) =>
		`https://api.paystack.co/transaction/verify/:${REFRENCE}`,

	VIEW_TRANSACTION_ENDPOINT: (REFRENCE) =>
		`https://api.paystack.co/transaction/:${REFRENCE}`,
};
