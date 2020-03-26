
const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    
	FeedbackSchema = new Schema(
		{
			content: {
				type: String,
				required: true
			},
			username:{
				type: String,
			},
			email: {
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

module.exports = mongoose.model('feedback', FeedbackSchema);
