import globalData from "../globalData.js";

// This class handles all the game connections socket handlers
class connectionHandler{
	constructor(server,client){
		this.server = server;
		this.client = client;
	}

	joinGameRoom(data){
		console.log("game id is", data.gameid);
		console.log("name is", data.name);
	}

	eventHandlers(){
		const client = this.client;

		client.on("joinGameRoom",function(data){
			this.joinGameRoom(data);
		}.bind(this));

		client.on("dummyFunction",function(data){
			try {
				let gameID = global.data.createNewGame("test");
				if (gameID != -1) {
					console.log("Created game with id: " + gameID);
				} else {
					console.log("Failed to create game");
				}
				let curGame = global.data.gameArray[0];
				curGame.addPlayer("bob");
				curGame.addPlayer("amy");
				curGame.addPlayer("joe");
				curGame.addPlayer("jen");
				curGame.addPlayer("fred");
				curGame.addPlayer("sam");
				curGame.findPlayer(0).addUnit("Warrior");
				console.log(curGame.findPlayer(0));
				console.log(curGame.findPlayer(1));
				console.log(curGame);
			} catch(err) {
				console.log(err)
			}
		}.bind(this));
	}

}

export default connectionHandler;