const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/categories', ctl.add)
	.delete('/categories/:id', ctl.remove)
	.get('/categories', ctl.list);

module.exports = router;
