const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/user/registry', ctl.registry)
	.post('/user/login', ctl.login)
	.post('/user/loginout', ctl.loginout)
	.delete('/user/:id', ctl.remove)
	.put('/user/:id', ctl.update)
	.get('/users', ctl.list);

module.exports = router;
