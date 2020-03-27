const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/comments/:id', ctl.add)
	.delete('/comments/:id', ctl.remove)
	.put('/comments/:id', ctl.update)
	.get('/comments', ctl.list);

module.exports = router;
