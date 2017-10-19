//require('./db/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(session({
	secret: 'b011ba61da4794b1371d6b63e4e5f5de' //jeff and collin
}))

const homeController = require('./controllers/home');

app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/', homeController);

app.listen(3000, ()=>{
	console.log('server is listening on 3000');
})
