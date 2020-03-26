const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/feedback', ctl.add)
	.get('/feedbacks', ctl.list);

module.exports = router;
