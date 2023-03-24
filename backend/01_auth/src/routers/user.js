const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const Middleware = require('../middlewares/auth');

router.get('', Middleware.authMiddleware, UserController.me);

module.exports = {
	userRouter: router,
};
