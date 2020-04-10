const mongoose = require('mongoose'),
	Category = mongoose.model('category');

/**
 * add
 * @description 新增分类
 * */
const add = async (req, res) => {
	console.log(req.body);
	
	const params  = req.body,
		data = await Category.create(params);
	res.json({ errNo: 0, message: '添加成功', data});
};

/**
 * remove
 * @description 删除分类
 * */
const remove = async (req, res) => {
	const { id } = req.params;
	await Category.findByIdAndRemove(id);
	res.json({ errNo: 0, message: '删除成功', data: null});
};

/**
 * update
 * @description 修改分类
 * */
const update = async (req, res) => {
	const { id } = req.params,
		data = await Category.findByIdAndUpdate(id, { new: true });
	res.json({ errNo: 0, message: '修改成功', data });
};

/**
 * list
 * @description 分类列表
 * */
const list = async (_, res) => {
	let list = [], total = 0;
	console.log(1);
	
	total =  await Category.countDocuments();
	total && (list = await Category.find());
	console.log(total, list);
	
	res.json({ errNo: 0, data: {total, list} });
};

module.exports = {
	add,
	update,
	remove,
	list,
};
