module.exports = {
	VIEW_BALANCE_ENDPOINT: 'https://api.stripe.com/v1/balance',

	VIEW_ALL_BALANCE_ENDPOINT:
		'https://api.stripe.com/v1/balance_transactions?limit=5',

	VIEW_ALL_TRANSACTIONS_ENDPOINT:
		'https://api.stripe.com/v1/balance_transactions?limit=50&type=charge',

	VIEW_CHARGES_TRANSACTIONS_ENDPOINT:
		'https://api.stripe.com/v1/charges?limit=50',
};
