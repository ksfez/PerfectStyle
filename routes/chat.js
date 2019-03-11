var express = require('express');
var Chat=require('../model/chat.js');
var router = express.Router();
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

/* SAVE Chat */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	var token = getToken(req.headers);
	
	if (token) {
		
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				console.log("entered in post")
				if(decoded.role=="Admin"){
					console.log("you are admin");
					var newChat = new Chat({
						name: req.body.newRoom,
						admin: decoded.name,
						adminId: decoded._id,
						listUsers:decoded
					});
					console.log("new chat created");
					console.log(newChat);
					// save the user
					newChat.save(function(err) {
						if (err) {
							return res.json({success: false, msg: 'Chat already exists.'});
						}
						res.json({success: true, msg: 'New chat created succesfully.'});
					});
				}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to add user.'});
   }	
	
});


/* Join a room */
router.put('/joinRoom', passport.authenticate('jwt', { session: false}), async function(req, res, next) {
	var token = getToken(req.headers);
	let response={success:true};
	if (token) {
		
		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				let newlistUsers=req.body.room.listUsers;
				newlistUsers[req.body.room.listUsers.length]=decoded;
				var myquery = { name: req.body.room.name };
				var newvalues = { $set: {listUsers: newlistUsers} };
				var options={new:true};
				await Chat.findOneAndUpdate(myquery, newvalues, options, function(err, res) {
					if (err) throw err;
					response.updatedChat=res;
				});
				res.json(response);
				
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to add user.'});
   }	
	
});

/* Leave a room */
router.put('/leaveRoom', passport.authenticate('jwt', { session: false}), async function(req, res, next) {
	var token = getToken(req.headers);
	let response={success:true};
	if (token) {
		
		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				let newlistUsers=req.body.room.listUsers;
				let i=0;
				let index=-1;
				for(i; i<newlistUsers.length; i++)
				{
					if(mongoose.Types.ObjectId(newlistUsers[i]._id).equals(mongoose.Types.ObjectId(decoded._id)))
						index=i;
				}
				newlistUsers.splice(index, 1);
				console.log("after leave room");
				console.log(newlistUsers);
				var myquery = { name: req.body.room.name };
				var newvalues = { $set: {listUsers: newlistUsers} };
				var options={new:true};
				await Chat.findOneAndUpdate(myquery, newvalues, options, function(err, res) {
					if (err) throw err;
					response.updatedChat=res;
				});
				res.json(response);
				
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to leave.'});
   }	
	
});


/* GET chats listing. */
router.get('/list', passport.authenticate('jwt', { session: false}), async function(req, res) {
	var token = getToken(req.headers);
	
	if (token) {
		
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				Chat.find(function (err, products) {
						if (err) return next(err);
						res.json(products);
					});
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to see chat.'});
   }	
	
});

module.exports = router;
