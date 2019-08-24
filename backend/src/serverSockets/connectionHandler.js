import { PLAYER } from "../player.js";
import { GAME_BOARD } from "../combatLogic/battle.js";

const maxGames = 1;
const maxPlayers = 6;

class GAME {
	constructor() {
		this.board = new GAME_BOARD();
		this.players = [];
		this.state = 0;
	}

	addPlayer(data) {
		if (this.players.length < maxPlayers) {
			this.players.push(data.player);
			return true;
		} else {
			return false;
		}
	}
}

var game = [];

function addGame() {
	if (game.length < maxGames) {
		game.push(new GAME());
		return game.length - 1;
	} else {
		return -1;
	}
}

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
				let gameID = addGame();
				if (gameID != -1) {
					console.log("Created game with id: " + gameID);
				} else {
					console.log("Failed to create game");
				}
				let curGame = game[0];
				curGame.addPlayer({player: new PLAYER(0)});
				curGame.addPlayer({player: new PLAYER(1)});
				curGame.addPlayer({player: new PLAYER(2)});
				curGame.addPlayer({player: new PLAYER(3)});
				curGame.addPlayer({player: new PLAYER(4)});
				curGame.addPlayer({player: new PLAYER(5)});
				console.log(curGame);
			} catch(err) {
				console.log(err)
			}
		}.bind(this));
	}

}

export default connectionHandler;