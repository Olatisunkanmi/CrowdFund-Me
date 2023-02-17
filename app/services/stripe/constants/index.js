module.exports = {
	VIEW_BALANCE_ENDPOINT: 'https://api.stripe.com/v1/balance',

	VIEW_ALL_BALANCE_ENDPOINT:
		'https://api.stripe.com/v1/balance_transactions?limit=500',

	// VIEW_ALL_TRANSACTIONS_ENDPOINT:
	// 	'https://api.stripe.com/v1/balance_transactions?limit=500&type=charge',

	VIEW_ALL_TRANSACTIONS_ENDPOINT:
		'https://api.stripe.com/v1/balance_transactions?created[gte]=1672594560&created[lte]=1675186560&limit=1000&type=charge',

	VIEW_CHARGES_TRANSACTIONS_ENDPOINT:
		'https://api.stripe.com/v1/charges?limit=500',
};
