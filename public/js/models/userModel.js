var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: {type: String, required: true, index: true},
	age: {type: Number, required: true, min: 18, max: 100}, 
	email: {type: String, required: true, uniqueness: true, lowercase: true}, 
	address: [{
		city: {type: String, required: true, uppercase: true},
		state: {type: String, required: true, uppercase: true},
		zip: {type: String, required: true},
		kind: {type: String, enum: ['Billing', 'Shipping', 'Both'], default: 'Both'}
	}]

})

module.exports = mongoose.model('user', schema);
