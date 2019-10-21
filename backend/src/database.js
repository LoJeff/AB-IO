import mongo from 'mongodb';

class database {
	constructor(){
		this.connectionURL = "mongodb://localhost:27017";
		this.dbName = 'AB-IO';

		this.mongoClient = mongo.MongoClient;

		this.connectionOptions = {
									useNewUrlParser: true,
									useUnifiedTopology: true,
								};
		this.db = null;
		this.client = null;
	}
	
	connect(){
		return new Promise((resolve,reject) => {
			if(this.db){
				resolve();
			} else {
				this.mongoClient.connect(this.connectionURL,this.connectionOptions,(err,client) => {
					if(err){
						reject(err);
					}
					else {
						console.log("Connected successfully to DB server");
						this.client = client;
						this.db = client.db(this.dbName);
						resolve();
					}
				});
			}
		});
	}

	close(){
		this.client.close();
	}

	// DB insert
	insertNewGame(gameid){
		if (!this.db){
			return;
		}
		var newGame = {
			gameid: gameid,
			chatLog: []
		}
		this.db.collection('game').insertOne(newGame,(err,results)=>{
	        if(err) console.log(err);
	    });
	}
	insertChatMessage(gameid,msg_from,msg_content,msg_type){
		if (!this.db){
			return new Promise((resolve,reject)=>{
				reject("No DB connection");
			});
		}
		var newChatMsg = {
							from: msg_from,
							content: msg_content,
							type: msg_type
						 };

		return new Promise((resolve,reject)=>{
			this.db.collection('game').findOneAndUpdate({gameid: gameid},{$push: {chatLog: newChatMsg}},{returnOriginal : false},(err,results)=>{
	        	if(err) {
		        	console.log("DB failure with error:", err);
		        	reject(err);
		        }
	        	resolve(results);
	    	});
	    });      
    }


	// DB query
	getAllGames(){
		if (!this.db){
			return new Promise((resolve,reject)=>{
				reject("No DB connection");
			});
		}
		return new Promise((resolve,reject)=>{
			this.db.collection('game').find().limit(5).toArray((err,documents)=>{
		        if(err) {
		        	console.log("DB failure with error:", err);
		        	reject(err);
		        }
		        resolve(documents);
	    	});
	    });
	}
	getGameByID(gameid){
		if (!this.db){
			return new Promise((resolve,reject)=>{
				reject("No DB connection");
			});
		}
		return new Promise((resolve,reject)=>{
			this.db.collection('game').findOne({gameid: gameid},(err,documents)=>{
		        if(err) {
		        	console.log("DB failure with error:", err);
		        	reject(err);
		        }
		        resolve(documents);
	    	});
	    });
	}
	getChatLog(gameid){
		if (!this.db){
			return new Promise((resolve,reject)=>{
				reject("No DB connection");
			});
		}
		return new Promise((resolve,reject)=>{
			this.db.collection('game').findOne({gameid: gameid},{projection: {gameid: 1, chatLog: 1}},(err,documents)=>{
		        if(err) {
		        	console.log("DB failure with error:", err);
		        	reject(err);
		        }
		        resolve(documents);
		    });
		});
	}
}

export default database;