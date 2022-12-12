const errController = require('./app/controllers/ErrorController');
const catchAsync = require('./app/utils/catchAsync');
const { app } = require('./index');
const http = require('http');
const debug = require('debug')('app:server');
const dotenv = require('dotenv');
const { ChainFundItDb } = require('./app/db');
dotenv.config();

// console.log(ChainFundItDb);

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

// Create server class
class Server extends http.createServer {
	constructor(app, port) {
		super();
		this.port = port;
		this.app = app;

		const server = http.createServer(this.app).listen(this.port);
		server.on('listening', ChainFundItDb);
		server.on('error', errController);
		server.on('listening', onListening);
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
	console.log(`Node is listening on ${port}`);
};

// Creating an instance of server
const server_one = new Server(app, port);

// Node Error Handing
process.on('unhandledRejection', (err) => {
	console.log(`Uncaught Rejection ${err.name}, ${err.message} `);
	server_one.close(() => {
		process.exit(1);
	});
});

process.on('uncaughtException', (err) => {
	console.log(`Uncaught Exception ${err.name}, ${err.message} `);
	server_one.close(() => {
		process.exit(1);
	});
});
