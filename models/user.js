const mongoose = require('mongoose');
const Beer = require('./beer');

const userSchema = new mongoose.Schema({

	username: String,
	password: String,
	beer: [Beer.schema]
})

module.exports = mongoose.model('User', userSchema);