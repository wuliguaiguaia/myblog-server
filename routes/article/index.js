const  express = require('express'),
	router = express.Router(),
	ctl = require('./controller'); 

router
	.get('/article/p/:id', ctl.p)
	.post('/article', ctl.add)
	.delete('/article/:id', ctl.remove)
	.put('/article/:id', ctl.update)
	.get('/articles', ctl.posts)
	.post('/article/:id/view-count', ctl.viewCount);

module.exports = router;
