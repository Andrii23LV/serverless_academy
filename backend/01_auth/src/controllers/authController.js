const AuthService = require('../services/auth');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
	async registration(req, res, _next) {
		try {
			const { email, password } = req.body;

			const userData = await AuthService.saveUser(email, password);
			return await res.status(200).json({ success: true, userData });
		} catch (err) {
			return res.status(409).json({ message: 'Not authorized' });
		}
	}
	async login(req, res, _next) {
		try {
			const { email } = req.body;
			const user = await AuthService.findUser(email);
			if (
				user &&
				(await bcryptjs.compare(String(req.body.password), String(user.password)))
			) {
				const payload = { email: user.email, userId: user._id };

				const jwtAccess = jwt.sign(payload, process.env.JWT_SECRET, {
					expiresIn: '60m',
				});

				const jwtRefresh = jwt.sign(payload, process.env.JWT_SECRET, {
					expiresIn: '1m',
				});

				res.cookie('token', jwtRefresh, { httpOnly: true });

				return await res.status(200).json({
					success: true,
					data: {
						id: user.id,
						accessToken: jwtAccess,	
						refreshToken: jwtRefresh,	
					}
				});
			}
			return res.status(400).json({ success: false, message: 'Not authorized' });
		} catch (err) {
			return res.status(404).json({ error: err });
		}
	}
}

module.exports = new AuthController();
