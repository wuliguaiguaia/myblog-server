const mongoose = require('mongoose'),
	Comment = mongoose.model('comment');

/**
 * add
 * @description 新增评论
 * */
const add = async (_, res) => {
	res.json({ errNo: 0, message: '添加成功' });
};

/**
 * remove
 * @description 删除评论
 * */
const remove = async (_, res) => {
	res.json({ errNo: 0, message: '删除成功' });
};

/**
 * update
 * @description 修改评论
 * */
const update = async (_, res) => {
	res.json({ errNo: 0, message: '修改成功' });
};

/**
 * list
 * @description 评论列表
 * */
const list = async (_, res) => {
	res.json({errNo: 0, data:[]});
};

module.exports = {
	add,
	remove,
	update,
	list
};
