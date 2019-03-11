var express = require('express');
var Shoe=require('../model/Shoe.js');
//var User=require('../model')('User');
var router = express.Router();

/* GET shoes listing. */
router.get('/list', async function(req, res) {
	console.log("Entered in get shoe");
    try {
        let shoes = await Shoe.REQUEST();
        console.log("Get all shoes: " + shoes);
        res.json(shoes); // return all shoes in JSON format
    } catch (err) {
        console.log(`Error: ${err}`);
        res.send([])
    }
	
});

/* SAVE Shoe */
router.post('/', function(req, res, next) {
	console.log("Entered in shoe post");
   /*Shoe.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);*/
	
    var newShoe = new Shoe({
      id: req.body.id,
	  name: req.body.name,
      color: req.body.color,
      price: req.body.price,
	  img: req.body.img,
	  branch: req.body.branch
    });
    // save the shoe
    newShoe.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Shoe already exists.'});
      }
      res.json({success: true, msg: 'New shoes are created succesfully.'});
    });
  
	
});

/* DELETE Shoe */
router.delete('/:id', function(req, res, next) {
  Shoe.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/login', function(req, res, next) {
	console.log("Entered in login post");
});
   
   
module.exports = router;
