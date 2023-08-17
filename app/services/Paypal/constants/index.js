const base_URL = "https://api-m.paypal.com";

module.exports = {
  GENERATE_PAYPAL_ACCESS_TOKEN: `${base_URL}/v1/oauth2/token`,

  VIEW_ALL_BALANCE: () =>
    `${base_URL}/v1/reporting/balances?as_time_of=${gte}&currency_code=ALL`,

  // VIEW_ALL_TRANSACTIONS_ENDPOINT: (gte, lte) =>
  // 	`${base_URL}? transactions?fields=transaction_info,payer_info,shipping_info,auction_info,cart_info,incentive_info,store_info&start_date=${gte}&end_date=${lte}&transaction_status=S&page_size=500`,

  VIEW_ALL_TRANSACTIONS_ENDPOINT: (start, end) =>
    `${base_URL}/v1/reporting/transactions?start_date=2022-12-01T00:00:00.000Z&transaction_type=T0005&rs&end_date=2022-12-30T00:00:00.000Z&page_size=50`,
};
