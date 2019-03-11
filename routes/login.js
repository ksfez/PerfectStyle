var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');



router.get('/', function (req, res, next) {
	console.log("entered in login get");
});

/*router.post('/', function (req, res, next) {
	console.log("entered in login post");
	console.log("body parsing", req.body);
	const handler = passport.authenticate('login',{
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true  
	});
	handler(req, res, next);
	console.log("about to quit login post");
});*/

router.post('/login',function (req, res, next) {
	console.log('enter in login routes');
	try{
		passport.authenticate('local', function(err, user, info){
		var token;
		// If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
	}
	catch(err){
		console.log(`Error: ${err}`);
        next(err);
	}

});


module.exports = router;
