const mongoose = require('mongoose'),
	Article = mongoose.model('article');

/**
 * data
 * @description 新增分类
 * */

const p = async res => {
	const id = res.body.params,
		article = await Article.findById(id);
	res.json({ errNo: 0,message: '获取成功', data: article});
};

/**
 * add
 * @description 新增文章
 * */ 
const add = async res => {
	const params = res.body;
	await Article.create(params);
	res.json({ errNo: 0, message: '添加成功'});
};

/**
 * remove
 * @description 删除文章
 * */ 
const remove = async res => {
	const {id} = res.body.params;
	await Article.findByIdAndRemove(id);
	res.json({ errNo: 0, message: '删除成功'});
};

/**
 * update
 * @description 修改文章
 * */ 
const update = async res => {
	const params = res.body;
	await Article.findByIdAndUpdate(params.id, params);
	res.json({ errNo: 0, message: '修改成功'});
};

/**
 * posts
 * @description 文章列表
 * */ 
const posts = async res => {
	const { pn, num, category, keyTitle } = res.body.params,
		query = {},
		skip = (pn-1) * num;

	let	total = 0,
		list = [];

	if(keyTitle) query.title = {$in: keyTitle};
	if(category) query.category = category;

	total = await Article.count(query);
	if (total) list = await Article.find(query).sort('-createTime').skip(skip).limit(num);
	res.json = { errNo: 0, data: { total,list } };
};

/**
 * addViewCount
 * @description 阅读量
 * */ 
const viewCount = async res => {
	const { id } = res.body.params;
	const article = await Article.findById(id); 
	article.viewCount++; 
	await article.save();
	res.json({ errNo: 0, message: '恭喜，新增阅读量😬' });
};



module.exports = {
	p,
	add,
	remove,
	update,
	posts,
	viewCount
};
