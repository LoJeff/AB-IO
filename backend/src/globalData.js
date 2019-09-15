import gameRoomObject from './gameRoomObject.js';

class globalData {
	constructor(){
		this.gameArray = [];
	}

	createNewGame(gameid){
		var newGame = new gameRoomObject();
		newGame.setId(gameid);

		this.gameArray.push(newGame);
	}

	findGame(gameid){
		var foundGame = this.gameArray.find((game) => game.id == gameid);
		return foundGame;
	}

	gameExists(gameid){
		return this.gameArray.some((game) => game.id == gameid);
	}
}

export default globalData;