const  express = require('express'),
	router = express.Router(),
	ctl = require('./controller'); 

router
	.get('/articles/p/:id', ctl.p)
	.post('/articles', ctl.add)
	.delete('/articles/:id', ctl.remove)
	.put('/articles/:id', ctl.update)
	.get('/articles', ctl.posts)
	.post('/articles/:id/view-count', ctl.viewCount);

module.exports = router;
