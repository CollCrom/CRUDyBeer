const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({

	name:       String,
	type:       String,
	abv:        String,
	brewery:    String,
	breweryImg: String,
	rating:     Number,
	review:     String,
	reviewedBy: String
})

module.exports = mongoose.model('Beer', beerSchema);


