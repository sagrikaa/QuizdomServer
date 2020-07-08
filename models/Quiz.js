const mongoose = require('mongoose');
const User = require('../models/User');
const Difficulty = [ 'easy', 'medium', 'hard' ];

const QuizSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'category'
	},

	difficult: {
		type: String,
		required: true
	},

	description: {
		type: String,
		maxlength: [ 300, 'Keep Description short and less than 300 characters' ]
	},

	questionset: [
		{
			question: {
				type: String,
				required: true
			},
			options: [ String ],
			correctAns: {
				type: String,
				required: true
			}
		}
	],

	creatorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},

	published: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: new Date().toDateString()
	}
});

QuizSchema.methods.getUser = async function() {
	return await User.findById(this.creatorId).select('-password');
};
module.exports = Quiz = mongoose.model('quiz', QuizSchema);
