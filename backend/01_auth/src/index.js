const express = require('express');
require('dotenv').config();

const { authRouter } = require('./routers/auth');
const { userRouter } = require('./routers/user');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/me', userRouter);

const start = async () => {
	try {
		app.listen(process.env.PORT, () => console.log('Server started'));
	} catch (err) {
		console.log(err.message);
	}
};

start();

// ERROR HANDLER
app.use(errorHandler);

function errorHandler(err, _req, res, _next) {
	console.error(err);
	res.status(500).send({ message: 'Server error' });
}
