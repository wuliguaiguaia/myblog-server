require('express-async-errors');
const createError = require('http-errors'),
	express = require('express'),
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	glob = require('glob'),
	methodOverride = require('method-override');

const loadRoutes = () => {
	const pattern = path.resolve('./routes/**/index.js');
	const files = glob.sync(pattern);
	files.forEach(file => app.use('/api', require(file)));
};

const errorHandler = () => {
	app.use((err, _, res, next)=> {
		console.log(err);
		// ObjectParameterError
		const errorType = ['MongooseError', 'ValidationError'];
		if (!errorType.includes(err.name)) next(createError(404, 'Invalid API key'));
		res.status(200);

		if (err.name === 'MongooseError') res.json({ errNo: err.code, message: err.errmsg});
		if (err.name === 'ValidationError'){
			let errors = Object.values(err.errors).map(error => error.message);
			res.json({ errNo: err.code || 0, message: err._message, errors });
		}
	});
};

const init = () => {
	app.use(logger('dev'))
		.use(express.json());
	loadRoutes();
	app.use(cookieParser())
		// .use(methodOverride('X-HTTP-Method-Override'))
		.use(express.urlencoded({ extended: false }))
		.use(bodyParser.urlencoded({ extended: true }));
	errorHandler();
};

init();
module.exports = app;