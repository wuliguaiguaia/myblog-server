const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ArticleSchema = new Schema(
		{
			title: {
				type: String,
				required: '标题都没有搞什么 :('
			},
			description: {
				type: String
			},
			content: {
				type: String,
				required: '多少写点吧 :('
			},
			private: {
				type: Boolean,
				default: false
			},
			category: {
				type: Schema.Types.ObjectId,
				ref: 'Category',
				required: '求你选个分类量吧 :)'
			},
			tag: {
				type: Array,
				ref: 'tag',
				default: []
			},
			viewVount: {
				type: Number,
				default: 0
			},
			bg: {
				type: String,
				default: 0
			}
		},
		{
			timestamps: {
				createdAt: 'createTime',
				updatedAt: 'updateTime'
			}
		}
	);

module.exports = mongoose.model('article', ArticleSchema);
