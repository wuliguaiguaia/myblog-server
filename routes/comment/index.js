const express = require('express'),
	router = express.Router(),
	ctl = require('./controller');

router
	.post('/comment/:id', ctl.add)
	.delete('/comment/:id', ctl.remove)
	.put('/comment/:id', ctl.update)
	.get('/comments', ctl.list);

module.exports = router;
