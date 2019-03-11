var express = require('express');
var Worker=require('../model/Worker.js');
//var User=require('../model')('User');
var router = express.Router();
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

/* GET Workers listing. */
router.get('/list', async function(req, res) {
	console.log("Entered in get worker");
    try {
        let workers = await Worker.REQUEST();
        res.json(workers); // return all Workers in JSON format
    } catch (err) {
        console.log(`Error: ${err}`);
        res.send([])
    }
	
});

/* SAVE Worker */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	console.log('routes worker');
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
				console.log("Entered in worker post");
				console.log(decoded);
				if(decoded.role=="Admin"){
					var newWorker = new Worker({
					id: req.body.id,
					name: req.body.name,
					color: req.body.color,
					price: req.body.price,
					img: req.body.img,
					branch: req.body.branch
					});
					// save the worker
					newWorker.save(function(err) {
						if (err) {
							return res.json({success: false, msg: 'Worker already exists.'});
						}
						res.json({success: true, msg: 'New worker is created succesfully.'});
					});
				}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to add worker.'});
   }	
	
});

/* DELETE Worker */
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	console.log("Entered in worker delete");
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
					Worker.findByIdAndRemove(req.params.id, req.body, function (err, post)
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
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete Worker.'});
   }	
	
});


router.post('/login', function(req, res, next) {
	console.log("Entered in login post in worker");
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
