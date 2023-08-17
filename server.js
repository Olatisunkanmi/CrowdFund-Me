const { errController } = require("./app/utils/");
const { Helper, constants } = require("./app/utils/");
const app = require("./app");
const http = require("http");
const dotenv = require("dotenv");
const { Sql_db } = require("./app/sql");
dotenv.config();

logger.warn(process.env.NODE_ENV);

const { CHAINFUNDIT_RUNNING } = constants;

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

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
    // server.on('listening', Sql_db.directCmd);
    server.on("error", errController);
    server.on("listening", onListening);
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  logger.info(`${CHAINFUNDIT_RUNNING} ${port}`);
};

// Creating an instance of server
const server_one = new Server(app, port);

// Node Error Handing
process.on("unhandledRejection", (err) => {
  logger.error(`Uncaught Rejection ${err.name}, ${err.message} `);
  server_one.close(() => {
    process.exit(1);
  });
});
