const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({
  secret: 'test secret',
  cookie: { maxAge: 60 * 1000 * 300 } //过期时间 ms
}))

router.get('/', function (req, res) {
  //session 已经登陆
  if (req.session.sign) {
    console.log(req.session);
    res.send('<strong>' + req.session.name + '</strong>' + 'Nice to see you again');
  }
  else {
    //未登陆过
    req.session.sign = true;
    req.session.name = 'Type Zero';
    res.end('Welcome:' + '<strong>' + req.session.name + '</strong>');
  }
});

module.exports = router;
