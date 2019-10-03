import { GAME_BOARD } from "./combatLogic/battleBoard.js";
import PLAYER from "./player/player.js";

class game {
	constructor(){
		this.id = '';
		this.players = [];
		this.board = new GAME_BOARD();
		this.maxPlayers = 6;

		this.tickInterval = undefined;
	}
	setId(gameid){
		this.board = new GAME_BOARD();
		this.id = gameid;
	}

	addPlayer(playerID,playerName) {

		if (this.players.length < this.maxPlayers) {
			this.players.push(new PLAYER(playerID, playerName));
			return true;
		} else {
			return false;
		}
	}

	removePlayer(playerName){
		this.players = this.players.filter( (player) => player.name != playerName);
	}

	findPlayer(id) {
		return this.players[this.players.findIndex( (player) => player.id == id)];
	}

	findPlayerId(id) {
		return this.players.findIndex( (player) => player.id == id);
	}

	getPlayersList() {
		return this.players;
	}

	beginGame(tickRate){
		// this.update();
		this.tickInterval = setInterval(this.update.bind(this),1000/tickRate);
	}

	update(){
		var date = new Date().toJSON();
		var sendData = {"gameid": this.id, "time": date};
		global.emitters.broadcast_gameUpdate(sendData);
	}

	playerToGameBoard() {
		this.board.addPlayerUnits(this.players)
	}
}

export default game;