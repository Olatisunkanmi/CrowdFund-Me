/**
 * A method of functions for the transaction Middleware
 */

class TransactionHelper {
	/**
	 * TransForms data from api into unique and objs
	 * @static
	 * @param
	 * @memberof TransactionHelper
	 * @returns { Array } Data - An array of new formed object from the third parties api
	 */
	static createNewObj(arr) {
		const Data = TransactionHelper.createTransactionList(arr);

		return Data;
	}

	/**
	 * Creates a new transaction list.
	 * @param {array} arr - Transaction list from all third parties api
	 * @param {*} net_NGN - Object containing total, net amount & platform net
	 * @param {*} net_USD - Object containing total, net amount & platform net
	 * @param {*} net_GBP - Object containing total, net amount & platform net
	 * @memberof TransactionHelper
	 * @returns { Array } Data - an array of newly formed objects
	 */
	static createTransactionList(arr) {
		return arr.map((el) => {
			//set transaction date
			const cur_date = new Date(el.paid_at || el.created * 1000);
			// const cur_date = new Date(el.paid_at || el.created);

			// currrent currency
			let cur_currency =
				el.currency ||
				el.transaction_info.transaction_amount.currency_code;

			// set transaction status
			let cur_status = el.paid || el.status;

			cur_status = TransactionHelper.setTransactionStatus(cur_status);

			//set transaction status
			const transaction_amount = el.amount / 100;

			//set network fee
			const network_fee = TransactionHelper.calcNetworkFee(el);

			//calculate 5% of each transaction
			const cur_percent = TransactionHelper.calcCurPercent(
				transaction_amount,
			);

			// platform fee =(  5% - network fee )
			let platform_fee = TransactionHelper.calcPlatformFee(
				cur_percent,
				network_fee,
			);

			// calc the net_amount of each transaction - after 5%
			const cur_net = TransactionHelper.calcNetAmount(
				transaction_amount,
				cur_percent,
			);

			// if  campaign Title is missing from Paystack
			TransactionHelper.setTransactionDesc(el);

			cur_currency =
				TransactionHelper.setTransactionsCurrency(cur_currency);

			return {
				id: el.id || el.transaction_info.transaction_id,
				status: cur_status,
				transaction_amount: transaction_amount,
				currency: cur_currency,
				network_fee: network_fee,
				platform_fee: platform_fee,
				net_amount: cur_net,
				paid_at: cur_date,
				channel:
					(el.channel && 'Paystack') ||
					(el.object && 'Stripe') ||
					(el.transaction_info.protection_eligibility && 'Paypal'),
				description: el.description || el.customer,
				//  ||el.transaction_info.transaction_subject,
			};
		});
	}

	static calcNetworkFee(el) {
		return (
			el.fee / 100 ||
			el.fees / 100 ||
			el.transaction_info.fee_amount.value * -1
		);
	}

	/**
	 * set description fields for paystack transaction
	 * @param {Object} el
	 * @memberof TransactionHelper
	 */
	static setTransactionDesc(el) {
		if (el.customer) {
			if (el.customer.first_name === null) {
				el.customer = el.metadata.custom_fields[0].value;
			} else if (el.customer.first_name !== null) {
				el.customer = `${el.customer.first_name}, ${el.customer.last_name}, ${el.customer.email}`;
			}
		}
	}

	/**
	 * calc the net_amount of each transaction - after 5%
	 * @param {Number} transaction_amount - transaction amount
	 * @param {Number} cur_percent - 5% of the transaction amount
	 * @memberof TransactionHelper
	 * @returns
	 */
	static calcNetAmount(transaction_amount, cur_percent) {
		return transaction_amount - cur_percent;
	}

	/**
	 *
	 * @private
	 * @param {Number} transaction_amount  amount of the el in the loop
	 * @memberof TransactionNumber
	 * @returns {Number} - 5% of the current transaction
	 */
	static calcCurPercent(transaction_amount) {
		return 0.05 * transaction_amount;
	}

	/**
	 * calculate platform fee for each transaction
	 * @param {String} cur_percent current percent
	 * @param {String} amount - current amount in the loop
	 * @memberof TransactionHelper
	 * @returns { String} platform fee
	 */
	static calcPlatformFee(cur_percent, network_fee) {
		let platform_fee = cur_percent - network_fee;

		//If Platform is less than 0, means network fee > 5%
		platform_fee < 0 ? (platform_fee = 0) : platform_fee;

		return platform_fee;
	}

	/**
	 * sets unique and similar status for all transactions
	 * @param {String} cur_status
	 * @memberof TransactionHelper
	 * @returns {String} - newly set variable for each transaction
	 */

	static setTransactionStatus(cur_status) {
		if (cur_status == 'S') {
			cur_status = 'success';
		} else if (cur_status == 'available') {
			cur_status = 'success';
		} else if (cur_status == 'success') {
			cur_status = 'success';
		}

		if (cur_status == 'pending') {
			cur_status = 'pending';
		}
		return cur_status;
	}

	/**
	 *Set a new currency across all transaction
	 * @param {String} cur_currency  current currency value of each transaction
	 * @memberof TransactionHelper
	 * @returns {String} newly set currency value
	 */
	static setTransactionsCurrency(cur_currency) {
		if (cur_currency == 'usd') {
			cur_currency = 'USD';
		}

		if (cur_currency == 'gbp') {
			cur_currency = 'GBP';
		}

		// logger.debug(cur_currency);
		return cur_currency;
	}

	/**
	 * Calculate total amount, net amount and platform fee for each denomination
	 * @static
	 * @private
	 * @param {String} cur_currency - currency of each transaction
	 * @param {String} cur_status - current status of each transaction
	 * @param {Number} net_NGN - net NGN amount
	 * @param {Number} net_USD - net USD amount
	 * @param {Number} net_GBP - net GBP amount
	 * @param {Number} transaction_amount  - current amount of each transaction
	 * @param {Number} cur_net - current net amount of each transaction. i.e ( - 5% )
	 * @param {Number} platform_fee - total platform fee. i.e ( ! > 5%)
	 * @memberof TransactionHelper
	 */
	static findCurrencyNet(
		transaction_list,
		net_NGN,
		net_USD,
		net_GBP,
	) {
		transaction_list.forEach((el) => {
			if (el.currency == 'NGN') {
				net_NGN.total_amount += el.transaction_amount;
				net_NGN.net_amount += el.net_amount;
				net_NGN.net_network += el.network_fee;
				net_NGN.net_platform += el.platform_fee;
			}

			if (el.currency == 'USD') {
				net_USD.total_amount += el.transaction_amount;
				net_USD.net_amount += el.net_amount;
				net_USD.net_network += el.network_fee;
				net_USD.net_platform += el.platform_fee;
			}
			if (el.currency == 'GBP') {
				net_GBP.total_amount += el.transaction_amount;
				net_GBP.net_amount += el.net_amount;
				net_GBP.net_network += el.network_fee;
				net_GBP.net_platform += el.platform_fee;
			}
		});

		return { net_NGN, net_USD, net_GBP, transaction_list };
	}

	/**
	 * @static
	 * @private
	 * @memberof TransactionHelper
	 * @returns {Object} - objects of all denominations
	 */

	static setCurrencyNet() {
		let net_NGN = {
			total_amount: 0,
			net_amount: 0,
			net_network: 0,
			net_platform: 0,
		};
		let net_USD = {
			total_amount: 0,
			net_amount: 0,
			net_network: 0,
			net_platform: 0,
		};
		let net_GBP = {
			total_amount: 0,
			net_amount: 0,
			net_network: 0,
			net_platform: 0,
		};
		return { net_NGN, net_USD, net_GBP };
	}

	/**
	 * fetch data from all third parties apis
	 * @static
	 * @param {Promise} paystack - The paystack promise to resolve
	 * @param {Promise} stripe- The stripe to resolve
	 * @memberof TransactionHelper
	 * @returns {Array || Null} Data - An array containing all the data
	 */
	static async fetchApiData(paystack, stripe) {
		try {
			const data = await Promise.all([paystack, stripe]).then(
				(values) => {
					return [...values[0].data.data, ...values[1].data.data];
				},
			);

			return TransactionHelper.createNewObj(data);
		} catch (e) {
			throw e;
		}
	}

	/**
	 * It create a  payment Intent on stripe api
	 * @static
	 * @param { Object } items - amount
	 * @memberof TransactionHelper
	 */
	static async createStripePaymentIntent(options) {}
}

module.exports = TransactionHelper;
