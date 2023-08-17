const config = require("../../../config/env");
const mysql = require("mysql2");

const db = mysql.createConnection(config.DB_URL);

db.on("error", (err) => {
  logger.error(`DB Error: ${err}`);
});

db.on("connect", () => {
  logger.info("Remote DB Connected");
});

module.exports = db;
