const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  createtime: { type: String, default: '' },
  updatetime: { type: String, default: '' },
  isadmin: { type: Boolean, default: false },
}, {
  collections: 'user'
})

module.exports = mongoose.model('User', userSchema, 'user')