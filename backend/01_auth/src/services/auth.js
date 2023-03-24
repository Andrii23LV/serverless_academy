const bcryptjs = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
});

class AuthService {
	async saveUser(email, password) {
		const hashedPassword = await bcryptjs.hash(password, 10);

		try {
			const result = await pool.query(
				'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
				[email, hashedPassword]
			);
			return result.rows[0];
		} catch (err) {
			console.error('Error inserting user:', err.message);
			throw err;
		}
	}

	async findUser(email) {
		try {
			const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
			return result.rows[0];
		} catch (err) {
			console.error('Error finding user:', err.message);
			throw err;
		}
	}
}

module.exports = new AuthService();
