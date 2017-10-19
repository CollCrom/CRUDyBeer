const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Beer = require('../models/beer');
const bcrypt = require('bcrypt');

router.route('/register')
	.get((req,res)=>{
		res.render('user/register', {loginMessage: ''});
	})
	.post((req, res)=>{
		User.findOne({username: req.body.username}, (err, user)=>{
			if(err)
				res.send(err)
			if(user !== null)
				res.render('user/register', {loginMessage: 'error creating user'})
			else{
				User.create(req.body, (err, user)=>{
					if(err)
						res.send(err)
					req.session.logged = true;
					req.session.username = user.username;
					res.render('user/profile', {user: user, logged: req.session.logged});
				})
			}
		})
	})

router.route('/login')
	.post((req, res)=>{
		User.findOne({username: req.body.username}, (err, user)=>{
			if(err)
				res.send('error');
			req.session.logged = true;
			req.session.username = user.username;
			res.render('user/profile', {user: user, logged: req.session.logged})
		})
	})

router.route('/logout')
	.post((req, res)=>{
		req.session.destroy()
		res.redirect('/');
	})

router.route('/:id')
	.get((req, res)=>{
		User.findById(req.params.id, (err, user)=>{
			if(err)
				res.send(err)
			res.render('user/profile', {user: user, logged: req.session.logged})
		})
	})

module.exports = router;