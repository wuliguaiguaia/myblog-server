const mongoose = require('mongoose'),
	Feedback = mongoose.model('feedback');

/**
 * add
 * @description 新增反馈
 * */
const add = async (req, res) => {
	res.json({ errNo: 0, message: '添加成功' });
};

/**
 * list
 * @description 反馈列表
 * */
const list = async (_, res) => {
	res.json({ errNo: 0, data: [] });
};

module.exports = {
	add,
	list
};
