// Import modules
const mongoose = require('mongoose');
const validator = require('validator');

// Creating model
var Usuario = mongoose.model('Usuario', {
	first_name: {
		type: String,
		required: true,
		trim: true
	},
	last_name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	personal_phone: {
		type: String,
		required: true,
		trim: true
	}
});

module.exports = {Usuario};
