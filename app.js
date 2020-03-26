require('express-async-errors');
const createError = require('http-errors'),
	express = require('express'),
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	glob = require('glob');

const loadRoutes = () => {
	const pattern = path.resolve('./routes/**/index.js');
	const files = glob.sync(pattern);
	files.forEach(file => app.use('/api', require(file)));
};

const errorHandler = () => {
	app.use((err, _, res, next)=> {
		if (err.name !== 'ValidationError') next(createError(404));
		let errors = Object.values(err.errors).map(error => error.message);
		res.status(200);
		res.json({ errNo: 0, message: err._message, errors });
	});
};

const init = () => {
	app.use(logger('dev'))
		.use(express.json());
	loadRoutes();
	app.use(cookieParser())
		.use(express.urlencoded({ extended: false }))
		.use(bodyParser.urlencoded({ extended: true }));
	errorHandler();
};

init();
module.exports = app;