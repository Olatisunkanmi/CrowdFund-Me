module.exports = {
	VIEW_TRANSACTIONS: 'https://api.paystack.co/transaction',

	VIEW_CUSTOMERS: 'https://api.paystack.co/customer',

	VALIDATE_TRANSACTION_ENDPOINT: (REFRENCE) =>
		`https://api.paystack.co/transaction/verify/:${REFRENCE}`,

	VIEW_TRANSACTION_ENDPOINT: (REFRENCE) =>
		`https://api.paystack.co/transaction/:${REFRENCE}`,
};
