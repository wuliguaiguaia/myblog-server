const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/categories', ctl.add)
	.delete('/categories/:id', ctl.remove)
	.put('/categories/:id', ctl.update)
	.get('/categories', ctl.list);

module.exports = router;
