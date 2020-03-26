const mongoose = require('mongoose'),
	Category = mongoose.model('category');

/**
 * add
 * @description 新增分类
 * */
const add = async res => {
	const params = res.body;
	await Category.create(params);
	res.json({ errNo: 0, message: '添加成功'});
};

/**
 * remove
 * @description 删除分类
 * */
const remove = async res => {
	const { id } = res.body.params;
	await Category.findByIdAndRemove(id);
	res.json({ errNo: 0, message: '删除成功'});
};

/**
 * list
 * @description 分类列表
 * */
const list = async res => {
	const data = await Category.find();
	res.json({ errNo: 0, data });
};

module.exports = {
	add,
	remove,
	list,
};
