const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/category', ctl.add)
	.delete('/category/:id', ctl.remove)
	.get('/categories', ctl.list);

module.exports = router;
