var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');


var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+'.'+file.originalname);
    }
});


var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


/*_router.put('/getFileUrl', function(req,res,next){
	try{
	let response = {success: true};
	let filepath =path.join(__dirname,'../uploads') +'\\'+ req.body.filename;
    //let filepath = './uploads'+"/"+ req.body.filename;
    response.filepath=filepath;
	//res.sendFile(filepath);
	console.log('filepath '+response);
    return res.json({success:true, filepath:filepath});
	}
	catch(err)
	{
		return res.status(501).json({error:err});
	}
	
});*/

_router.post('/download', function(req,res,next){
	console.log('enter in download');
	console.log('req.body.filename '+req.body.filename);
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
	res.sendFile(filepath);
    //res.sendFile(req.body.filename);
});

module.exports = _router;