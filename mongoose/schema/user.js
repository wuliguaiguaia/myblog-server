const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	
	UserSchema = new Schema(
		{
			username: { 
				type: String, 
				default: '', 
			},
			password: { 
				type: String, 
				default: '' 
			},
			isadmin: { 
				type: Boolean, 
				default: false 
			},
			website: {
				type: Boolean,
			},
		},
		{
			timestamps: {
				createdAt: 'createTime',
				updatedAt: 'updateTime'
			}
		}
	);

module.exports = mongoose.model('user', UserSchema);