var myHeaders = new Headers();
myHeaders.append(
	'Authorization',
	'Bearer sk_live_1803bd30e6b436462a7a810739c984cf99ec1d49',
);
myHeaders.append(
	'Cookie',
	'sails.sid=s%3A1MMraUX40rQ97UryBya_tkbrpDfXjxpH.ZdpszSpZYrBPDGP6RzuEFJSC8szkyFXeZZG8Abl9bcc',
);

var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};

// Catch errors from beginning of the getData function
getData().catch((error) => {
	console.error(error);
});

// async/await the getData function to get JSON results
async function getData() {
	const response = await fetch(
		'https://api.paystack.co/transaction?status=success&perPage=500',
		requestOptions,
	);
	console.log(response);
	const transactions = await response.json();
	console.log(transactions);
	var count = transactions.data.length;
	/**
	 *
	 *
	 *
	 */

	// console.log(data);
	var formatter = new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN',
	});
	var sum = [];
	var counter = [];
	// Pick campaign title from the page
	var pageTitle = document.getElementById('title')?.textContent;

	// print all transactions data from API request
	var temp = '';
	// var total = "";
	for (let i = 0; i < count; i++) {
		const { metadata, customer, reference } = transactions.data[i];
		var customerID = customer.id;
		if (metadata == null) {
			if (reference == '1') {
				temp += `<tr>`;
				temp += `<td>${formatter.format(
					transactions.data[i].amount / 100,
				)}</td>`; // instead of concatenating with "" + ""
				temp += `<td>Help Alhassan Raise Funds for His Medical Treatment</td>`;
				temp += `<td>Victor Kanwea</td>`;
				temp += `<td>${transactions.data[i].channel}</td>`;
				temp += `<td>${new Date(
					transactions.data[i].paid_at,
				).toLocaleString('en-NG')}</td>`;
			}
		} else {
			var campTitle = metadata.custom_fields[0].value;
			var donorName = metadata.custom_fields[1].value;
			if (
				campTitle.includes(pageTitle) ||
				(customerID == '99538082' &&
					!campTitle.includes(pageTitle)) ||
				(customerID == '100393985' && !campTitle.includes(pageTitle))
			) {
				temp += `<tr>`;
				temp += `<td>${formatter.format(
					transactions.data[i].amount / 100,
				)}</td>`; // instead of concatenating with "" + ""
				temp += `<td>${campTitle}</td>`;
				temp += `<td>${donorName}</td>`;
				temp += `<td>${transactions.data[i].channel}</td>`;
				temp += `<td>${new Date(
					transactions.data[i].paid_at,
				).toLocaleString('en-NG')}</td>`;
			}
		}
	}

	document.getElementById('data').innerHTML = temp;

	// print specific transaction data  for a given transaction
	for (let j = 0; j < count; j++) {
		const { id, metadata, reference, amount, customer } =
			transactions.data[j];
		if (metadata == null) {
			if (reference == '1') {
				sum[j] = Number(amount) / 100;
				counter[j] = id;
			}
		} else {
			var campaign_title = metadata.custom_fields[0].value;
			var CUS_ID = customer.id;

			if (
				(CUS_ID == '99538082' &&
					!campaign_title.includes(pageTitle)) ||
				(CUS_ID == '100393985' && !campaign_title.includes(pageTitle))
			) {
				const { amount } = transactions.data[j];
				console.log(amount);
				sum[j] = Number(amount) / 100;
			} else if (campaign_title.includes(pageTitle)) {
				const { amount } = transactions.data[j];
				console.log(amount);
				sum[j] = Number(amount) / 100;
			}
		}

		// calculate total sum generated then divide over goal for progress percentage
		var totalSum = sum.reduce((a, b) => a + b, 0); // + Add pre-raised GBP value here
		var goal1 = document.getElementById('goal')?.textContent;
		goal1 = Number(goal1.replace(/[^0-9.-]+/g, ''));
		var progressPercent = (totalSum / goal1) * 100;
		console.log(`${progressPercent.toFixed(2)}%`);
		totalSum = formatter.format(totalSum); // $2,500.00
		document.getElementById('goal-number').innerHTML = totalSum;
		document.getElementById(
			'progress',
		).style.width = `${progressPercent}%`;
	}
}
