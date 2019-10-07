import globalData from "../globalData.js";
import { POS } from '../utils/pos.js';

import UNIT_STATE from '../combatLogic/unitState.js';

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

		var game = global.data.findGame(data.gameid);
		// check that max players have not been exceeded
		if(game.getPlayersList().length < game.maxPlayers){
			// add the player to the gamelist
			game.addPlayer(client.id,data.name);

			// broadcast to all users in the room that a new player has joined
			var playersList = global.data.findGame(data.gameid).getPlayersList();
			var broadcastData = {"gameid":data.gameid,"playersList":playersList};
			global.emitters.broadcast_updateRoomPlayers(broadcastData);	
		} else{
			// throw an error, max players reached in this game room
		}
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
			global.emitters.broadcast_updateRoomPlayers(broadcastData);
		}
	}

	startGame(client,data){
		// Check if players is equal to max length


		// find game
		var game = global.data.findGame(data.gameid);
		game.beginGame(global.data.serverTickRate);
	}

	eventHandlers(){
		const client = this.client;

		client.on("joinGameRoom",function(data){
			this.joinGameRoom(client,data);
		}.bind(this));

		client.on("leaveGameRoom",function(data){
			this.leaveGameRoom(client,data);
		}.bind(this));

		client.on("startGame",function(data){
			this.startGame(client,data);
		}.bind(this));
		client.on("dummyFunction",function(data){
			try {
				if (true) {
					let gameID = global.data.createNewGame("test");
					if (gameID != -1) {
						console.log("Created game with id: " + gameID);
					} else {
						console.log("Failed to create game");
					}
					let curGame = global.data.gameArray[0];
					curGame.addPlayer(0, "bob");
					curGame.addPlayer(1, "amy");
					curGame.addPlayer(2, "joe");
					curGame.addPlayer(3, "jen");
					curGame.addPlayer(4, "fred");
					curGame.addPlayer(5, "sam");
					var p0 = curGame.findPlayer(0);
					var p1 = curGame.findPlayer(1);
					var u00 = p0.addUnit("warrior");
					var u01 = p0.addUnit("warrior");
					var u10 = p1.addUnit("warrior");
					var u11 = p1.addUnit("warrior");
					p0.addXP(2);
					p1.addXP(2);
					p0.boardMove(p0.benchGet(0), new POS(0, -3));
					p1.boardMove(p1.benchGet(0), new POS(1, -3));
					var idxs = curGame.playerToGameBoard();
	
					// console.log(p0.unitHolder);
					// console.log(p1.unitHolder);
					// curGame.board.logTiles();
					
					var p0board = p0.board();
					console.log("INIT:")
					curGame.board.logTiles();
					console.log(Object.values(p0board));
					var result;
					var i = 100;
					do {
						console.log("COUNTDOWN: " + i);
						result = curGame.battleUpdate();
						console.log(result);
						i--;
					} while (!result.end && i > 0);
					console.log("FINAL:")
					curGame.board.logTiles();
					console.log("DONE");
					console.log(idxs);
				}
			} catch(err) {
				console.log(err)
			}
		}.bind(this));
	}

}

export default connectionHandler;