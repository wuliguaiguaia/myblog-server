var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api', function(req, res, next) {
res.json({
  data: "后台返回结果 xxxx"
});});

module.exports = router;
