var express = require('express');
var Casual=require('../model/Casual.js');
//var User=require('../model')('User');
var router = express.Router();
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

/* GET casuals listing. */
router.get('/list', async function(req, res) {
	console.log("Entered in get casual");
    try {
        let casuals = await Casual.REQUEST();
        res.json(casuals); // return all casuals in JSON format
    } catch (err) {
        console.log(`Error: ${err}`);
        res.send([])
    }
	
});

/* SAVE Casual */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	console.log('routes casual');
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
				console.log("Entered in casual post");
				console.log(decoded);
				if(decoded.role=="Admin"){
					var newCasual = new Casual({
					id: req.body.id,
					name: req.body.name,
					color: req.body.color,
					price: req.body.price,
					img: req.body.img,
					branch: req.body.branch
					});
					// save the casual
					newCasual.save(function(err) {
						if (err) {
							return res.json({success: false, msg: 'Casual already exists.'});
						}
						res.json({success: true, msg: 'New casual is created succesfully.'});
					});
				}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to add casual.'});
   }	
	
});

/* DELETE Casual */
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	console.log("Entered in casual delete");
    var token = getToken(req.headers);
	if (token) {
		console.log("entered in token");
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else {
				// if everything is good, save to request for use in other routes
				
				console.log(decoded);
				if(decoded.role=="Admin"){
					Casual.findByIdAndRemove(req.params.id, req.body, function (err, post)
					{
						if (err) return next(err);
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
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete casual.'});
   }	
	
});


router.post('/login', function(req, res, next) {
	console.log("Entered in login post in casual");
});
   
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
