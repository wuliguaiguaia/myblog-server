const mongoose = require('mongoose'),
	Article = mongoose.model('article');

/**
 * p
 * @description 获取文章
 * */
const p = async (req, res) => {
	const { id } = req.params,
		data = await Article.findById(id);
	res.json({ errNo: 0,message: '获取成功', data});
	// category
};

/**
 * add
 * @description 新增文章
 * */
const add = async (req, res) => {
	const params = req.body,
		data  = await Article.create(params);
	res.json({ errNo: 0, message: '添加成功', data});
};

/**
 * remove
 * @description 删除文章
 * */ 
const remove = async (req, res) => {
	const { id } = req.params;
	await Article.findByIdAndRemove(id);
	res.json({ errNo: 0, message: '删除成功', data: null});
};

/**
 * update
 * @description 修改文章
 * */ 
const update = async (req, res) => {
	const { id } = req.params;
	const content = req.body,
		data = await Article.findByIdAndUpdate(id, content, {new :true});
	res.json({ errNo: 0, message: '修改成功', data});
};

/**
 * list
 * @description 文章列表
 * */ 
const list = async (req, res) => {
	const { pn, num, category, keyTitle } = req.query,
		query = {},
		skip = (pn-1) * num;

	let	total = 0,
		list = [];

	if(keyTitle) query.title = {$in: keyTitle};
	if(category) query.category = category;
	total = await Article.countDocuments(query);
	total && (list = await Article.find(query).sort('-createTime').skip(skip).limit(+num));
	res.json({ errNo: 0, data: { total,list }});
};

/**
 * addViewCount
 * @description 阅读量
 * */ 
const viewCount = async (req, res) => {
	const { id } = req.params,
		data = await Article.findById(id); 
	data.viewCount++; 
	await data.save();
	res.json({ errNo: 0, message: '恭喜，新增阅读量😬', data});
};

module.exports = {
	p,
	add,
	remove,
	update,
	list,
	viewCount
};
