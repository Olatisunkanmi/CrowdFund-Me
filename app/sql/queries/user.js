module.exports = {
  // createUserTable: `CREATE tABLE IF NOT EXISTS users (`
  fetchUserByEmail: `SELECT * FROM users WHERE email = ?`,
  fetchUsers: ` SELECT
	id,
	first_name, 
	last_name,
	email,
	user_type,
	balance_ngn,
	balance_usd,
	balance_gbp,
	no_of_campaigns FROM users`,

  fetchUserById: `SELECT 
	id,
	first_name, 
	last_name,
	email,
	user_type,
	balance_ngn,
	balance_usd,
	balance_gbp,
	no_of_campaigns FROM users WHERE id = ?`,

  // createUser: `
  // INSERT INTO users
  // (id, first_name, last_name, email, user_type, password, confirm_password,
  // balance_ngn, balance_usd, balance_gbp, no_of_campaigns )
  // VALUES(UUID_TO_BIN (?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,

  createUser: `INSERT INTO users (id, first_name, last_name, email, user_type, password, confirm_password, balance_ngn, balance_usd, balance_gbp, no_of_campaigns )
	VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
};
