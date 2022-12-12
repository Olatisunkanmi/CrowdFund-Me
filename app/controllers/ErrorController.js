const AppError = require('../utils/AppError');

const handleErrorDB = (err) => {
	const message = `Invallid ${err.path} : ${err.value}. `;
	return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	});
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if ((process.env.NODE_ENV = 'development')) {
		let error = { ...err };

		if (err.name == 'CastError ') {
			error = handleErrorDB(err);
			//
		} else if (err.code === 'EADDRINUSE') {
			console.error(err.port + ' is already in use');
			process.exit(1);
			//
		} else if (err.code === 'EACCES') {
			console.error(err.port + ' requires elevated privileges');
			process.exit(1);
		}
		sendErrorDev(err, res);
	}
};
