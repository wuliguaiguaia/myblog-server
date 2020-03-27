const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/feedbacks', ctl.add)
	.get('/feedbacks', ctl.list);

module.exports = router;
