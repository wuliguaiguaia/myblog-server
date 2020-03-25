const express = require('express');
const router = express.Router();
const resData = require("./utils")
const User = require('../database/schema/user')

/**
 * 注册
 */ 
router.post("/user/registry", (req, res, next) => {
  const {username, password} = req.body;
  try {
    User.findOne({ username }).then(user => {
      if (!user) {
        const user = new User({ username, password, createtime });
        user.save().then(info => {
          req.session.userInfo = { id: info._id }
        }).catch(() => { });
        resData.errNo = 0;
        resData.message = '注册成功';
        resData.data = null;
      } else {
        resData.errNo = 1001;
        resData.message = "该用户名已被注册~";
        resData.data = null;
      }
      res.json(resData);
    });
  } catch{
    res.json({
      errNo: 1002,
      message: '用户注册失败'
    });
  }
  return;
});

/**
 * 登录
 */ 
router.post("/user/login", function(req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username, password }).then((info) => {
    if (info) {
      resData.errNo = 0;
      resData.message = '登录成功';
      resData.data = {
        id: info._id,
        username: info.username
      }
      req.session.userInfo = { id: info._id }
     } else {
      resData.errNo = 1003;
      resData.message = "用户名或密码错误";
    }
    res.json(resData);
  });
  return;
});

/**
 * 退出
 */ 
router.get("/user/loginout", function(req, res, next) {
  req.session.userInfo = null;
  res.redirect('/');
  res.json({
    errNo:0,
    message: '退出成功'
  })
  return;
});


/**
 * 评论提交
 */ 
module.exports = router;
