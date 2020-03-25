const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref:'Category'}, // 关联字段
    private: { type: Boolean, default: false },
    tags: { type: Array, default: []},
    viewVount: { type: Number, default: 0 },
    pic: { type: Number, default: 0 },
    // 如何保存图片
    comments: { type: Array, default: [] },
    createtime: { type: String, default: '' },
    updatetime: { type: String, default: '' },
}, {
    collections: 'article'
})

module.exports = mongoose.model('Article', userSchema, 'article')