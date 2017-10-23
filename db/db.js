const mongoose = require('mongoose');

const connectionString = process.env.DB_HOST;

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