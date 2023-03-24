const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
});

class UserService {
	async getUser(email) {
		try {
			const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
			return result.rows[0];
		} catch (err) {
			console.error('Error getting user:', err.message);
			throw err;
		}
	}
}

module.exports = new UserService();
