var express = require('express');
var Item=require('../model/Item.js');
//var User=require('../model')('User');
var router = express.Router();
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

/* GET items listing. */
router.get('/list', async function(req, res) {
	console.log("Entered in get item");
    try {
        let items = await Item.REQUEST();
        //console.log("Get all items: " + items);
        res.json(items); // return all items in JSON format
    } catch (err) {
        console.log(`Error: ${err}`);
        res.send([])
    }
	
});

/* GET items for userlisting. */
router.get('/list/:id', async function(req, res) {
	console.log("Entered in get item");
        let items = await Item.REQUEST();
		 let length=items.length;
		for (var i = 1; i < length; i++) {
		if (items[i].userId != req.params.id) {
			for (var j = i; j < length; j++)
			{
				items[j]=items[j+1];
				length=items.length-1;
			}
		}
		console.log(items);
        res.json(items); // return all items in JSON format
		}
	
});


/* SAVE Item */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	console.log('routes item');
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
				console.log("Entered in item post");
				if(decoded._id==req.body.userId){
					
					var newItem = new Item({
					id: req.body.id,
					name: req.body.name,
					color: req.body.color,
					price: req.body.price,
					img: req.body.img,
					userId: req.body.userId
					});
						console.log("newItem " + newItem);
					//Item.CREATE(newItem);
					//res.json({success: true, msg: 'New Item are created succesfully.'});
					// save the item
					newItem.save(function(err) {
						if (err) {
							return res.json({success: false, msg: 'Item already exists.'});
							console.log("error in routes ");
						}
						console.log("New Item are created succesfully ");
						res.json({success: true, msg: 'New Item are created succesfully.'});
						
					});
				}
				else{
					return res.status(403).send({success: false, msg: 'You are not an logged in'});
				}
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to add item.'});
   }	
	
});

/* DELETE Item */
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
	console.log("Entered in item delete");
    var token = getToken(req.headers);
	if (token) {
		console.log("entered in token");
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			} else
				{
				// if everything is good, save to request for use in other routes
				console.log(decoded);
				Item.findByIdAndRemove(req.params.id, req.body, function (err, post)
				{
					if (err) return next(err);
					res.json(post);
				});
				console.log("item removed");
				
			}
		});
	
   }
   else{
	   
    return res.status(403).send({success: false, msg: 'Unauthorized to delete item.'});
   }	
	
});



router.post('/login', function(req, res, next) {
	console.log("Entered in login post in item");
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

