const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
	
	type:    String,
	abv:     Number,
	brewery: String,
	rating:  Number,
	review:  String

})

module.exports = mongoose.model('Beer', beerSchema);