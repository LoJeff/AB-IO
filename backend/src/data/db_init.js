var MongoClient = require('mongodb').MongoClient;
var dev_url = "mongodb://localhost:27017/";

var connectionOptions = {
							useNewUrlParser: true,
							useUnifiedTopology: true,
						};

var collectionName = "game";

MongoClient.connect(dev_url, connectionOptions, function(err, client){
  if (err) throw err;

  // // create the db if the db does not exist
  // client.db("admin").admin().listDatabases((err,result)=> {
  // 	console.log(result);
  // 	if(result.databases.find((db) => db.name == "test")){
  // 		console.log("DB exists");
  // 	} else{
  // 		var dbo = db.db("test");
  // 	}
  // });

  var db = client.db("AB-IO");

  db.listCollections({},{nameOnly: true}).toArray((err,doc) => {
  	if(err) throw err;

  	if(doc.find((collection) => collection.name == collectionName)){
  		console.log("collection " + collectionName + " found!");
  		client.close();
  	} else {
  		console.log("collection " + collectionName + " not found!");
  		db.createCollection(collectionName, (err, res) => {
		    if (err) throw err;
		    console.log("collection " + collectionName + " created!");
		    client.close();
		});
  	}
  });
  // client.db("admin").admin().list
  // console.log(db_list);
  // var dbo = db.db("test");

  // // create the game collection if the collection game does not exist
  // dbo.createCollection("test_1", function(err, res) {
  //   if (err) throw err;
  //   console.log("collection created!");
  //   db.close();
  // });
});
