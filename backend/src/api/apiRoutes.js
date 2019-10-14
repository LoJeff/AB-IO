import express from 'express';
var router = express.Router();

// api routes
router.get('/game',function(req,res){
	global.data.mongoDB.getAllGames().then(function(documents){
		res.json(documents);
	}).catch(function(err){
		res.json({error: err});
	});
});

router.get('/game/:gameid',function(req,res){
	global.data.mongoDB.getGameByID(req.params.gameid).then(function(documents){
		res.json(documents);
	}).catch(function(err){
		res.json({error: err});
	});
});

router.get('/game/:gameid/chatLog',function(req,res){
    global.data.mongoDB.getChatLog(req.params.gameid).then(function(documents){
    	res.json(documents);
    }).catch(function(err){
		res.json({error: err});
	});
});

router.post('/game/:gameid/chatLog',function(req,res){
	var gameid = req.params.gameid;
	var msg_from = req.body.from;
	var msg_content = req.body.content;
	var msg_type = "chatMessage"; 
	
	global.data.mongoDB.insertChatMessage(gameid, msg_from, msg_content, msg_type).catch(function(err){
		console.log("Error:", err);
	}).finally(function(results){
		//broadcast new message to all 
		var sendData = {
			gameid: gameid,
			from: msg_from,
			content: msg_content,
			type: msg_type
		};
		global.emitters.broadcast_chatUpdate(sendData);
		res.status(200).send("Request successful")
	});
});

export default router;