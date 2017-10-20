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
			res.render('home', {loginMessage: 'You must be logged in to review me', logged: req.session.logged})
		}
		else{
			res.render('beer/new', {errorMessage: ''})
		}
	})
	.post((req, res)=>{
		User.findOne({username: req.session.username},(err, user)=>{
			for(el in req.body){
				if(!req.body[el]){
					res.render('beer/new', {errorMessage: 'Field cannot be empty'})
					break;
				}
			}
			Beer.create(req.body, (err, beer)=>{
				if(err)
					res.send(err);
				user.beer.push(beer);
				user.save((err, data)=>{
					res.redirect('/user')	
				})
			})
		})
	})
router.route('/:id')
	.get((req, res)=>{
		Beer.findById(req.params.id, (err, beer)=>{
			if(err){
				res.send('im an error getting the ID')
			}else{
				res.render('beer/show', {beer: beer, username: req.session.username})
			}
		})
	})




module.exports = router;