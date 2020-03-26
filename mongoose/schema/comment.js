const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	
	CommentSchema = new Schema(
		{
			articleId: {
				type: String,
				ref: 'article'
			},
			content: {
				type: String,
				required: true
			},
			username: {
				type: String,
				required: true
			},
			website: {
				type: String,
			}
		},
		{
			timestamps: {
				createdAt: 'createTime',
				updatedAt: 'updateTime'
			}
		}
	);

module.exports = mongoose.model('comment', CommentSchema);
