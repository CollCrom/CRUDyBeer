const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Beer = require('../models/beer');
const bcrypt = require('bcrypt');

router.get('/', (req, res)=>{
	res.send('profile page');
});

router.route('/register')
	.get((req,res)=>{
		res.render('users/register', {loginMessage: ''});
	})
	.post((req, res)=>{
		User.findOne({username: req.body.username}, (err, user)=>{
			if(err)
				res.send(err)
			if(user !== null)
				res.render('users/register', {message: 'error creating user'})
			else{
				User.create(req.body, (err, user)=>{
					if(err)
						res.send(err)
					req.session.logged = true;
					req.session.username = user.username;
					res.redirect('/');
				})
			}
		})
	})

router.post('/logout', (req, res)=>{
	req.session.destroy()
	res.redirect('/');
})

module.exports = router;