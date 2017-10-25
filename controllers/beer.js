const express = require('express');
const router  = express.Router();
const Beer    = require('../models/beer')
const User    = require('../models/user')

router.get('/', (req, res)=>{
	Beer.find((err, beers)=>{
		res.render('beer/index', {

							beers: beers
		})
	})
})


router.route('/new')
	.get((req, res)=>{
		if(!req.session.logged){
			res.render('home', {loginMessage: 'You must be logged in to make reviews', logged: req.session.logged})
		}
		else{
			res.render('beer/new', {errorMessage: '', username: req.session.username})
		}
	})
	.post((req, res)=>{
		if(!req.body.breweryImg)
			req.body.breweryImg = '/images/placeholderImg.jpg';
		User.findOne({username: req.session.username},(err, user)=>{
			for(el in req.body){
				if(el === 'breweryImg')
					continue;
				if(!req.body[el]){
					res.render('beer/new', {errorMessage: 'Field cannot be empty', username: req.session.username})
					break;
				}
			}
			if(req.body.abv.slice(-1) !== '%'){
				req.body.abv += '%';
			}
			Beer.create(req.body, (err, beer)=>{
				if(err)
					res.send(err);
				else{
					user.beer.push(beer);
					user.save((err, data)=>{
						res.render('user/profile', {user: user, userBeer: user.beer, logged: req.session.logged})
					})	
				}
			})
		})
	})

router.route('/edit/:id')
	.get((req, res)=>{
		Beer.findById(req.params.id, (err, beer)=>{
			res.render('beer/edit', {beer: beer})
		})
	})
	.put((req, res)=>{
		User.findOne({username: req.session.username}, (err, user)=>{
			Beer.findByIdAndUpdate(req.params.id, req.body,  {new: true}, (err, beer)=>{
				if(err)
					res.send(err);
				else{
					user.beer.id(req.params.id).remove()
					user.beer.push(beer);
					user.save((err, data)=>{
						res.render('user/profile', {user: user, userBeer: user.beer, logged: req.session.logged});
					})
				}
			})
		})
	})

router.route('/:id')
	.get((req, res)=>{
		Beer.findById(req.params.id, (err, beer)=>{
			if(err){
				res.send('im an error getting the ID')
			}else{
				res.render('beer/show', {beer: beer, username: req.session.username, logged: req.session.logged})
			}
		})
	})

router.route('/delete/:id')
	.get((req, res)=>{
		Beer.findByIdAndRemove(req.params.id, (err, beer)=>{
			User.findOne({'beer._id': req.params.id}, (err, foundUser)=>{
				foundUser.beer.id(req.params.id).remove();
				foundUser.save((err,data)=>{
					res.redirect('/user')
				})
			})
		})
	})




module.exports = router;