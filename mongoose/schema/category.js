const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    
	CategorySchema = new Schema(
		{
			value: {
				type: String,
				required: true,
				unique: true,
			}
		},
		{
			timestamps: {
				createdAt: 'createTime',
				updatedAt: 'updateTime'
			}
		}
	);

module.exports = mongoose.model('category', CategorySchema);