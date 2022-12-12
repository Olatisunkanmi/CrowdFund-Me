class responseHandler {
	constructor(res, data, statusCode, TOKEN) {
		this.data = data;
		this.TOKEN = TOKEN;

		res.status(statusCode).json({
			length: data.length,
			status: 'success',
			data: this.data,
			TOKEN: this.TOKEN,
		});
	}
}

module.exports = responseHandler;
