const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudoSchema = new Schema({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	receiverId:{
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	title: {
		type:String,
		trim: true,
		required: 'Title required.'
	},
	body: {
		type: String,
		trim: true,
		required: 'You actually have to give some kudos. Come on, son!'
	}
})

const Kudo = mongoose.model('Kudo', kudoSchema);
module.exports = Kudo;