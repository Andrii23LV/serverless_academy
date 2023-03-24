const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/sign-up', AuthController.registration);

router.post('/sign-in', AuthController.login);

module.exports = {
	authRouter: router,
};
