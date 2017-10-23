const request = require('request');
const Beer    = require('../models/beer')

const options = {
	url: 'http://api.brewerydb.com/v2/beers?availableId=1&withBreweries=Y&key='+process.env.BEER_API_KEY,
	method: 'GET',
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
};
const apiCall = () => {
	request(options, (err, res, body)=>{
		const json = JSON.parse(body);
		const beers = json.data;
		beers.forEach((beer, i)=>{
			const beerObj = {}
			// name         abv         type                    review              brewery
			if(beer.name && beer.abv && beer.style.shortName && beer.description && beer.breweries[0].name){
				beerObj.name = beer.name;
				beerObj.abv = beer.abv;
				beerObj.type = beer.style.shortName;
				beerObj.review = beer.description;
				beerObj.brewery = beer.breweries[0].name;
				beerObj.rating = Math.floor(Math.random()*10) / 2;
				Beer.create(beerObj, (err, beer)=>{
					if(err)
						res.send(err)
				})
			}
		})
	})
}

module.exports = apiCall();