const mongoose = require('mongoose');

const connectionString = 'mongodb://heroku_htt7qxkf:bioljiigkkldsiui3q584i98bi@ds235065.mlab.com:35065/heroku_htt7qxkf';

mongoose.connect(connectionString);


mongoose.connection.on('connected', ()=>{

	console.log('mongoose connection to ' + connectionString)
})

mongoose.connection.on('ERROR', ()=>{

	console.log('Error ' + connectionString)
})

mongoose.connection.on('DISCONNECT', ()=>{

	console.log('mongoose disconnection to ' + connectionString)
})