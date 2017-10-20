const express = require('express');
const router  = express.Router();
const Beer    = require('../models/beer')
const User    = require('../models/user')

router.get('/', (req, res)=>{
	res.render('beer', {})
})


router.route('/new')
	.get((req, res)=>{
		res.render('beer/new', {})
	})
	.post((req, res)=>{
		User.findOne(req.session.username,(err, user)=>{
			Beer.create(req.body, (err, beer)=>{
				if(err)
					res.send(err);
				user.beer.push(beer);
				user.beer.save((err, data)=>{
					res.redirect('/user')	
				})
			})
		})
	})




module.exports = router;