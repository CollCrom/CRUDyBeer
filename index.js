require('./db/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const request = require('request');

const options = {
	url: 'http://api.brewerydb.com/v2/beer/random?key=b4499fb9e0c21596e2b33684953ef8ba',
	method: 'GET',
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
};

const breweryArr = [];
for(let i = 0; i < 10; i++){
	request(options, (err, res, body)=>{
		const json = JSON.parse(body);
		const beer = json.data;
		let beerObj = {}
		if(beer.name && beer.abv && beer.style.name && beer.description){
			beerObj.name = beer.name;
			beerObj.abv = beer.abv;
			beerObj.type = beer.style.name;
			beerObj.description = beer.description;
			breweryArr.push(beerObj);
			console.log(breweryArr.length)
			console.log(breweryArr);
		}
	})
	console.log(breweryArr.length);
}

app.use(session({
	secret: 'b011ba61da4794b1371d6b63e4e5f5de', //jeff and collin
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
