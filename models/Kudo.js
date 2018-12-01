const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudoSchema = new Schema({
	sender:{
		type: String,
		trim: true,
		required: "Recipient must be included."
	},
	receiver:{
		type: String,
		trim: true,
		required: "Recipient must be included."
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