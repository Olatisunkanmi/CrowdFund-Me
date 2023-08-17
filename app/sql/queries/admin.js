module.exports = {
  createDB: `CREATE DATABASE IF NOT EXISTS ChainFundIt`,
  sudoDeleteAllTables: `DELETE * from users`,
  deleteUsersTable: `DROP TABLE IF EXISTS users`,
};
