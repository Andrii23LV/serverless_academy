const UserService = require('../services/user');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
	async me(req, res, _next) {
		try {
			const { email } = req.body;

			const user = await UserService.getUser(email);
			return await res.status(200).json({
				success: true,
				data: {
					id: user.id,
					email: user.email,
				},
			});
		} catch (err) {
			return await res.status(200).json({ success: true, error: err });
		}
	}
}

module.exports = new UserController();
