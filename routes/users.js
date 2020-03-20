var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/zzz', function(req, res, next) {
  res.json({
    data: '后台返回结果 getArticle'
  })
});

module.exports = router;
