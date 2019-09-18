import game from './game.js';

class globalData {
	constructor(){
		this.gameArray = [];
		this.maxGames = 10;
		this.serverTickRate = 1;
	}

	createNewGame(gameid){
		var newGame = new game();
		newGame.setId(gameid);

		if (this.gameArray.length < this.maxGames) {
			this.gameArray.push(newGame);
			return this.gameArray.length - 1;
		} else {
			return -1;
		}
		
	}

	findGame(gameid){
		var foundGame = this.gameArray.find((game) => game.id == gameid);
		return foundGame;
	}

	removeGame(gameid){
		this.gameArray = this.gameArray.filter( (game) => game.id != gameid);
	}

	gameExists(gameid){
		return this.gameArray.some((game) => game.id == gameid);
	}

}

export default globalData;