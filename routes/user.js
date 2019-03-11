var express = require('express');
var User=require('../model/User.js');
var Chat=require('../model/chat.js');
var router = express.Router();

var mail = require('../nodeMailerWithTemp');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');


/* GET users listing. */
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
				// if everything is good, save to request for use in other routes
				if(decoded.role=="Admin"){
					User.find(function (err, products) {
						if (err) return next(err);
						res.json(products);
					});
	
				}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to see users list.'});
   }	
	
});


//router for signup
router.post('/signup', function(req, res) {
  if (!req.body.mail || !req.body.password) {
    res.json({success: false, msg: 'Please fill mail and password.'});
  } else {
	  
    var newUser = new User({
	  name: req.body.name,
      mail: req.body.mail,
      password: req.body.password,
	  role: req.body.role,
	  branch: req.body.branch,
	  img: req.body.img
    });
    // save the user
    newUser.save(function(err) {
		console.log(err);
      if (err) {
        return res.json({success: false, msg: 'Mail already exists.'});
      }
      res.json({success: true, msg: 'New user created successfully .'});
    });
  }
});


/* SAVE User */
router.post('/', /*passport.authenticate('jwt', { session: false}),*/ function(req, res, next) {
	/*var token = getToken(req.headers);
	
	if (token) {
		
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				if(decoded.role=="Admin"){*/
					var newUser = new User({
						name: req.body.name,
						mail: req.body.mail,
						password: req.body.password,
						role: req.body.role,
						branch: req.body.branch,
						img: req.body.img
					});
					// save the user
					newUser.save(function(err) {
						if (err) {
							return res.json({success: false, msg: 'User already exists.'});
						}
						res.json({success: true, msg: 'New user are created succesfully.'});
					});
				/*}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to add user.'});
   }	
	*/
});

//router for logout
router.get('/logout', passport.authenticate('jwt', { session: false}), async function(req, res, next) {
	var token = getToken(req.headers);
	if (token) {
		
		jwt.verify(token, config.secret, async (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				var myquery = { _id: decoded._id };
				var newvalues = { $set: {connected: 'false'} };
				var options={new:true};
				await User.findOneAndUpdate(myquery, newvalues, options, async function(err, resp) {
					if (err) return res.status(403).send({success: false, msg: 'Could not update user.'});
					user=resp;
					//update the chat listUsers
				await Chat.find( async function (err, products) {
					if (err) return next(err);
					let i=0;
					let j=0;
					for(i; i<products.length; i++)
					{
						let newListUsers=products[i].listUsers;
						console.log("userId: " + user._id);
						for(j=0; j<products[i].listUsers.length; j++)
						{
							console.log(products[i].listUsers[j]._id);
							if(mongoose.Types.ObjectId(products[i].listUsers[j]._id).equals(mongoose.Types.ObjectId(user._id))){
								console.log("find the user");
								newListUsers[j]=user;
							}
						}
						console.log("new list user");
						console.log(newListUsers);
						var myquery = { name: products[i].name };
						var newvalues = { $set: {listUsers: newListUsers} };
						var options={new:true};
						await Chat.findOneAndUpdate(myquery, newvalues, options, function(err, res) {
							if (err) throw err;
							console.log("after update ");
							console.log(res);
						});
					}
				});
				});
				delete req.session.user;
				res.json({success: true, message:"log out with success"});
			}
		});
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to log out.'});
   }	
	
});

//router for login
router.post('/login', async function(req, res) {
  let response={success:true};
  User.findOne({
    mail: req.body.mail
  }, async function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, async function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
		  var myquery = { _id: user._id };
		  var newvalues = { $set: {connected: 'true'} };
		  var options={new:true};
		  await User.findOneAndUpdate(myquery, newvalues, options, async function(err, res) {
			if (err) throw err;
			user=res;
			console.log("new user: "+user);
		  });
		  //update the chat listUsers
		  await Chat.find( async function (err, products) {
			if (err) return next(err);
			let i=0;
			let j=0;
			for(i; i<products.length; i++)
			{
				let newListUsers=products[i].listUsers;
				
				for(j=0; j<products[i].listUsers.length; j++)
				{
					if(mongoose.Types.ObjectId(products[i].listUsers[j]._id).equals(mongoose.Types.ObjectId(user._id))){
						newListUsers[j]=user;
					}
				}
				
				var myquery = { name: products[i].name };
				var newvalues = { $set: {listUsers: newListUsers} };
				var options={new:true};
				await Chat.findOneAndUpdate(myquery, newvalues, options, function(err, res) {
					if (err) throw err;
					//response.updatedChat=res;
				});
			}
		  });
			 
          var token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 900000});
		  req.session.user = req.body.username;
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/profile', function(req, res, next) {
	console.log("Entered in profile get");
  res.send([]);
});


// update a user
router.put('/:id', passport.authenticate('jwt', { session: false}), async (req, res) => {
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
				//if(decoded.role=="Admin"){
					User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
						if (err) return next(err);
					});
					var updatedUser = new User({
						name: req.body.name,
						mail: req.body.mail,
						password: req.body.password,
						role: req.body.role,
						branch: req.body.branch,
						img: req.body.img
					});
					// save the user
					updatedUser.save(function(err) {
						console.log(err);
						if (err) {
							return res.json({success: false, msg: 'Mail already exists.'});
						}
						// if user is found and password is right create a token
						var token = jwt.sign(updatedUser.toJSON(), config.secret);
						// return the information including token as JSON
						res.json({success: true, token: 'JWT ' + token});
					});
				/*}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}*/
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete shoe.'});
   }	
	
});

/* DELETE User */
router.delete('/:id', passport.authenticate('jwt', { session: false}), async function(req, res, next) {
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
				if(decoded.role=="Admin"){
					User.findByIdAndRemove(req.params.id, req.body, async function (err, post) {
						if (err) return next(err);
						//update the chat listUsers
						let user=post;
						await Chat.find( async function (err, products) {
							if (err) return next(err);
							let i=0;
							let j=0;
							for(i; i<products.length; i++)
							{
								let newlistUsers=products[i].listUsers;
				
								for(j=0; j<products[i].listUsers.length; j++)
								{
									if(mongoose.Types.ObjectId(products[i].listUsers[j]._id).equals(mongoose.Types.ObjectId(user._id))){
										newlistUsers.splice(j, 1);
									}
								}
					
								var myquery = { name: products[i].name };
								var newvalues = { $set: {listUsers: newlistUsers} };
								var options={new:true};
								await Chat.findOneAndUpdate(myquery, newvalues, options, function(err, res) {
									if (err) throw err;
									//response.updatedChat=res;
								});
							}
						});	
						res.json(post);
					});
				}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete shoe.'});
   }	
	
});


/* Check Admin User */
router.get('/checkAdmin', passport.authenticate('jwt', { session: false}), function(req, res, next) {
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
				if(decoded.role=="Admin"){
					res.json({success: true, token: 'JWT ' + token});
				}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   return res.status(403).send({success: false, msg: 'You are not an admin'});
   }	
	
});

/* Check Admin User */
router.get('/checkConnection', passport.authenticate('jwt', { session: false}), function(req, res, next) {
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
				console.log("entered in else of checkConnection");
				res.json({success: true, token: decoded.name});
			}
		});
	
   }
   else{
	   return res.status(403).send({success: false, msg: 'You are not an admin'});
   }	
});

/*Forgot Password*/
router.post('/forgotPassword', async function(req, res) {
  User.findOne({
	  mail: req.body.mail
	  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
		//change password
		newPassword=password_generator(5);
		console.log("NEW PASSWORD:");
		console.log(newPassword);
		User.updateOne({mail: req.body.mail}, {password:newPassword});
		mail.sendPasswordReset(req.body.mail, user.name, 'http://localhost:3000/resetPassword/p?mail='+user.mail);
		res.json({success: true});
    }
	
  });
  
});



//to generate a new password
function password_generator( len ) {
    var length = (len)?(len):(10);
	var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
	var numeric = '0123456789';
	var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
	var password = "";
	var character = "";
	var crunch = true;
	while( password.length<length ) {
		entity1 = Math.ceil(string.length * Math.random()*Math.random());
		entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
		entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
		hold = string.charAt( entity1 );
		hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
		character += hold;
		character += numeric.charAt( entity2 );
		character += punctuation.charAt( entity3 );
		password = character;
		}
		return password;
}


//authorization token
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
