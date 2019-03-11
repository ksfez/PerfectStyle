var express = require('express');
var User=require('../model/User.js');
var router = express.Router();

var mail = require('../nodeMailerWithTemp');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');


/*Reset Password*/
router.get('/p', async function(req, res, next) {
  console.log(req.query.mail);
  User.findOne({mail: req.query.mail}, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
        // if user is found and password is right create a token
        var token = jwt.sign(user.toJSON(), config.secret, {expiresIn: 300});
        // return the information including token as JSON
		$location.path("resetPassword", {title: "Reset Password", user:token});
        res.json({success: true, token: 'JWT ' + token}); 
    }
	
  });
	
});


module.exports = router;