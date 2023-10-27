const mongoose = require('mongoose');

const entryItemSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	quantity: {
		type: Number,
		default: 1,
	},
	tax: {
		type: Number,
		default: 23,
	},
	netAmount: {
		type: Number,
		required: true,
	},
	gross: {
		type: Number,
		required: true,
	},
});

exports.EntryItem = mongoose.model('EntryItem', entryItemSchema);
