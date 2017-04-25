
var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	address: String,
	company: String
});

module.exports = mongoose.model('Contact', ContactSchema);

