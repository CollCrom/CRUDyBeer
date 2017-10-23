require('dotenv').config()

require('./db/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const request = require('request');
const beerArr = require('./utilities/apiCall');

app.use(session({
	secret:process.env.SESSION_KEY, //jeff and collin
	resave: false,
	saveUnitialized: false
}))

const beerController = require('./controllers/beer');
const homeController = require('./controllers/home');
const userController = require('./controllers/user');

app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/beer', beerController);
app.use('/user', userController);
app.use('/', homeController);

app.listen(3000, ()=>{
	console.log('server is listening on 3000');
})
