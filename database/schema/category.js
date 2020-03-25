const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, default: '' },
    createtime: { type: String, default: '' },
    updatetime: { type: String, default: '' },
}, {
    collections: 'category'
})

module.exports = mongoose.model('Category', userSchema, 'category')