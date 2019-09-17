import globalData from "../globalData.js";

// This class handles all the game connections socket handlers
class connectionHandler{
	constructor(server,client){
		this.server = server;
		this.client = client;
	}

	joinGameRoom(client,data){
		// client joins room with gameid
		client.join(data.gameid);

		// if game does not exist
		if(global.data.findGame(data.gameid) === undefined){
			global.data.createNewGame(data.gameid);
		}

		// add the player to the gamelist
		global.data.findGame(data.gameid).addPlayer(client.id,data.name);

		// broadcast to all users in the room that a new player has joined
		var playersList = global.data.findGame(data.gameid).getPlayersList();
		var broadcastData = {"gameid":data.gameid,"playersList":playersList};
		global.emitter.broadcast_updateRoomPlayers(broadcastData);	
	}

	leaveGameRoom(client,data){
		// client leaves the room with the gameid
		client.leave(data.gameid);

		// remove the player from the room
		global.data.findGame(data.gameid).removePlayer(data.name);

		var playersList = global.data.findGame(data.gameid).getPlayersList();

		// if that was the last user in the room, delete the room
		if(playersList.length == 0 ) {
			console.log("No one left in game id:",data.gameid,"removing game...");
			global.data.removeGame(data.gameid);
		}
		else{
			// otherwise, update the game room
			// broadcast to all users in the room that a new player has joined
			var broadcastData = {"gameid":data.gameid,"playersList":playersList};
			global.emitter.broadcast_updateRoomPlayers(broadcastData);
		}
	}

	eventHandlers(){
		const client = this.client;

		client.on("joinGameRoom",function(data){
			this.joinGameRoom(client,data);
		}.bind(this));

		client.on("leaveGameRoom",function(data){
			this.leaveGameRoom(client,data);
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