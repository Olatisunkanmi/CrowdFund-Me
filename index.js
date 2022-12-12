const express = require('express');
const { urlencoded, json } = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const AppError = require('./app/utils/AppError');
const TRANSACTIONROUTE = require('./app/routes/TransactRoutes');
const errController = require('./app/controllers/ErrorController');

const app = express();
// adds security middleware to handle potential attacks from HTTP requests
app.use(helmet());
// adds middleware for cross-origin resource sharing configuration
app.use(cors());
// adds middleware that parses requests with x-www-form-urlencoded data encoding
app.use(urlencoded({ extended: true }));
// adds middleware that parses requests whose content-type is application/json
app.use(express.json());
// initialize Morgan
app.use(morgan('common'));

app.use('/api/v1/transactions', TRANSACTIONROUTE);

// catches 404 errors and forwards them to error handlers
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Can't find ${req.originalUrl} on this server!!`,
			404,
		),
	);
});
// handles all forwarded errors
app.use(errController);

module.exports = { app };
