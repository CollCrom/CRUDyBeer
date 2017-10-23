require('dotenv').config()
require('./db/db');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const request = require('request');

// const options = {
// 	url: 'http://api.brewerydb.com/v2/beers?availableId=1&withBreweries=Y&key=b4499fb9e0c21596e2b33684953ef8ba',
// 	method: 'GET',
// 	headers: {
// 		'Access-Control-Allow-Origin': '*'
// 	}
// };

// //Ask Jim about this
// const breweryArr = [];
// request(options, (err, res, body)=>{
// 	const json = JSON.parse(body);
// 	const beers = json.data;
// 	beers.forEach((beer)=>{
// 		let beerObj = {}
// 		// name         abv         type                    review              brewery
// 		if(beer.name && beer.abv && beer.style.shortName && beer.description && beer.breweries[0].name){
// 			beerObj.name = beer.name;
// 			beerObj.abv = beer.abv;
// 			beerObj.type = beer.style.shortName;
// 			beerObj.description = beer.description;
// 			beerObj.breweries[0].name
// 			breweryArr.push(beerObj);
// 		}
// 	})
// })

// breweryArr.forEach((beer)=>{
// 	console.log(beer);
// })

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
