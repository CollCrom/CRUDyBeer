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

	Beer.create(req.body, (err, beer)=>{
		res.redirect('/user')
		})
	})




module.exports = router;