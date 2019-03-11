var express = require('express');
var Store=require('../model/Store.js');
//var User=require('../model')('User');
var router = express.Router();
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

/* GET stores listing. */
router.get('/list', async function(req, res) {
	console.log("Entered in get store");
    try {
        let stores = await Store.REQUEST();
        //console.log("Get all stores: " + stores);
        res.json(stores); // return all stores in JSON format
    } catch (err) {
        console.log(`Error: ${err}`);
        res.send([])
    }
	
});

/* SAVE Store */
router.post('/', /*passport.authenticate('jwt', { session: false}),*/ function(req, res, next) {
	console.log('routes store');
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
				console.log("Entered in store post");
				console.log(decoded);
				if(decoded.role=="Admin"){*/
					var newStore = new Store({
					name: req.body.name,
					branchNum: req.body.branchNum,
					address: req.body.address,
					lon: req.body.lon,
					lat: req.body.lat
					});
					// save the store
					newStore.save(function(err) {
						if (err) {
							return res.json({success: false, msg: 'Store already exists.'});
						}
						res.json({success: true, msg: 'New stores are created succesfully.'});
					});
				/*}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to add store.'});
   }*/	
	
});

/* DELETE Store */
router.delete('/:id', /*passport.authenticate('jwt', { session: false}), */ function(req, res, next) {
	/*console.log("Entered in store delete");
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
				if(decoded.role=="Admin"){*/
					Store.findByIdAndRemove(req.params.id, req.body, function (err, post)
					{
						if (err) return next(err);
						res.json(post);
					});
				/*}
				else{
					return res.status(403).send({success: false, msg: 'You are not an admin'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete store.'});
   }	
	*/
});


router.post('/login', function(req, res, next) {
	console.log("Entered in login post in store");
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
