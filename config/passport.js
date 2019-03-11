var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../model/User.js');
var config = require('../config/database'); // get db config file

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	console.log('entered in passport strategy');
    User.findById(jwt_payload._id, function(err, user) {
          if (err) {
			  console.log('entered in passport strategy1');
              return done(err, false);
          }
          if (user) {
			  console.log('entered in passport strategy2');
              return done(null, user);
          } else {
			  console.log('entered in passport strategy3');
              return done(null, false);
          }
      });
  }));
};