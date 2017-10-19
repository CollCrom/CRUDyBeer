const express = require('express');
const router  = express.Router();
const Beer    = require('../models/beer.js')

router.get('/', (req, res)=>{
	res.render('beer', {})
})

router.get('/new', (req, res)=>{
	res.render('beer/new', {})
})




module.exports = router;