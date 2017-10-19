const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/beer';

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