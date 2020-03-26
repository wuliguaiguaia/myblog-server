const mongoose = require('mongoose'),
	url = 'mongodb://localhost:27017/node_server',
	path = require('path'),
	glob = require('glob');

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	connectTimeoutMS: 10000,
	socketTimeoutMS: 10000
};

const connect = () => {
	return new Promise( resolve => {
		mongoose.connect(url, options);

		mongoose.connection.on('disconnected', () => {
			mongoose.connect(url);
		});

		mongoose.connection.on('error', err => {
			console.log(err);
			mongoose.connect(url);
		});

		mongoose.connection.once('open', () => {
			console.log('MongoDB Connected successfully!');
			resolve();
		});
	});
};
const loadModels = () => {
	const pattern = path.resolve(__dirname,'./schema/*.js');
	const files = glob.sync(pattern);
	files.forEach(file => require(file));
};


module.exports = { connect, loadModels};
