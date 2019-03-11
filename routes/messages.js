var express = require('express');
var Message=require('../model/message.js');
var User=require('../model')('User');
var router = express.Router();
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// get a conversation
router.put('/getConversation', passport.authenticate('jwt', { session: false}), async (req, res) => {
	let response = {success: true};
	console.log("entered in getConversation of the message router");
	var token = getToken(req.headers);
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				/*let conversation=Message.getMessagesByConv(req.body.room);
				console.log(conversation);*/
				console.log(req.body.room);
				Message.getMessagesByConv(req.body.room, (err, conversation) => {
				if (err) {
					response.success = false;
					response.msg = "There was an error on getting the conversation";
					res.json(response);
				} else {
					response.msg = "Conversation retrieved successfuly";
					response.conversation = conversation;
					console.log(conversation);
					res.json(response);
				}
				});
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete shoe.'});
   }	
	
});



// like a message
router.put('/like', passport.authenticate('jwt', { session: false}), async (req, res) => {
	let response = {success: true};
	let dislikeFlag=false;
	console.log("entered in like of the message router");
	var token = getToken(req.headers);
	if (token) {
		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				let numOflikes=req.body.like+1;
				let numOfdislikes=req.body.unlike;
				let newListUserLike=req.body.listUserLike;
				let newListUserUnlike=req.body.listUserUnlike;
				let i=0;
				//check if the user already liked
				for (i; i<req.body.listUserLike.length; i++)
				{
					
					if(newListUserLike[i]._id==decoded._id)
						return res.status(401).send({
							success: false,
							message: 'Already liked this message'
						});
				}
				//check if he already disliked
				for (i=0; i<req.body.listUserUnlike.length; i++)
				{
					
					if(newListUserUnlike[i]._id==decoded._id){
						dislikeFlag=true;
						numOfdislikes=numOfdislikes-1;
						newListUserUnlike.splice(i, 1);
					}
				}
				newListUserLike[req.body.listUserLike.length]=decoded;
				console.log(numOflikes);
				var myquery = { _id: req.body._id };
				var newvalues = { $set: {like: numOflikes, unlike: numOfdislikes, listUserLike:newListUserLike, listUserUnlike:newListUserUnlike} };
				var options={new:true};
				await Message.findOneAndUpdate(myquery, newvalues, options, function(err, res) {
					if (err) throw err;
					response.updatedMess=res;
				});
				res.json(response);
				//Message.updateOne( { id: req.body._id }, {like: numOflikes});
				
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete shoe.'});
   }	
	
});

// like a message
router.put('/unlike', passport.authenticate('jwt', { session: false}), async (req, res) => {
	let response = {success: true};
	console.log("entered in unlike of the message router");
	var token = getToken(req.headers);
	if (token) {
		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				let numOfUnlikes=req.body.unlike+1;
				let numOflikes=req.body.like;
				var myquery = { _id: req.body._id };
				let newListUserUnlike=req.body.listUserUnlike;
				let newListUserLike=req.body.listUserLike;
				let i=0;
				//check if the user already disliked
				for (i; i<req.body.listUserUnlike.length; i++)
				{
					if(newListUserUnlike[i]._id==decoded._id)
						return res.status(401).send({
							success: false,
							message: 'Already disliked this message'
						});
				}
				//check if he already liked
				for (i=0; i<req.body.listUserLike.length; i++)
				{
					
					if(newListUserLike[i]._id==decoded._id){
						dislikeFlag=true;
						numOflikes=numOflikes-1;
						newListUserLike.splice(i, 1);
					}
				}
				newListUserUnlike[req.body.listUserUnlike.length]=decoded;
				console.log(newListUserUnlike);
				console.log(decoded);
				var newvalues = { $set: {like: numOflikes, unlike: numOfUnlikes, listUserLike:newListUserLike, listUserUnlike:newListUserUnlike} };
				var options={new:true};
				await Message.findOneAndUpdate(myquery, newvalues, options, function(err, res) {
					if (err) throw err;
					response.updatedMess=res;
				});
				res.json(response);
				//Message.updateOne( { id: req.body._id }, {like: numOflikes});
				
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete shoe.'});
   }	
	
});





// like a message
router.put('/userDetails', passport.authenticate('jwt', { session: false}), async (req, res) => {
	let response = {success: true};
	let dislikeFlag=false;
	console.log("entered in like of the message router");
	var token = getToken(req.headers);
	if (token) {
		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				let fromUser={mail:'', role:'', numOfLikes:0, numOfDislikes:0};
				User.findById(mongoose.Types.ObjectId(req.body.userId), (error, user) => {
					if (error || user==null) {
							response.success = false;
							response.msg = "There was an error on getting the user details";
							return res.status(403).send(response);
						} else { 
					fromUser.mail=user.mail;
					fromUser.role=user.role;
					Message.getMessagesByUserId(req.body.userId, (err, messages) => {
						if (err) {
							response.success = false;
							response.msg = "There was an error on getting the user msg";
							res.json(response);
						} else {
							let i=0;
							for(i; i<messages.length; i++){
								fromUser.numOfLikes=fromUser.numOfLikes+messages[i].like;
								fromUser.numOfDislikes=fromUser.numOfDislikes+messages[i].unlike;
							}
							response.fromUser=fromUser;
							res.json(response);
						}
					});
				}
				});
				
				
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete shoe.'});
   }	
	
});

module.exports = router;
