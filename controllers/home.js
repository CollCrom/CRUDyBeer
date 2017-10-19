const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	res.render('home', {logged: req.session.logged})
})

module.exports = router;