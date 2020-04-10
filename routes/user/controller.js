const mongoose = require('mongoose'),
	User = mongoose.model('user');

/**
 * registry
 * @description 注册
 * */
const registry = async (_, res) => {
	res.json({ errNo: 0, message: '注册成功' });
};

/**
 * login
 * @description 登录
 * */
const login = async (_, res) => {
	res.json({ errNo: 0, message: '登录成功' });
};

/**
 * loginout
 * @description 退出
 * */
const loginout = async (_, res) => {
	res.json({ errNo: 0, message: '登录成功' });
};

/**
 * remove
 * @description 删除用户
 * */
const remove = async (_, res) => {
	res.json({ errNo: 0, message: '删除成功' });
};

/**
 * update
 * @description 修改用户
 * */
const update = async (_, res) => {
	res.json({ errNo: 0, message: '修改成功' });
};

/**
 * list
 * @description 用户列表
 * */
const list = async (_, res) => {
	res.json({ errNo: 0, data: [] });
};

module.exports = {
	login,
	registry,
	loginout,
	remove,
	update,
	list,
};
