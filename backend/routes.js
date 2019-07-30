import express from 'express';
var router = express.Router();

// default route
router.get('/',function(req,res,next){
    res.sendFile(__dirname + '/client/build/index.html');
});

export default router;