const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/users/registry', ctl.registry)
	.post('/users/login', ctl.login)
	.post('/users/loginout', ctl.loginout)
	.delete('/users/:id', ctl.remove)
	.put('/users/:id', ctl.update)
	.get('/users', ctl.list);

module.exports = router;
