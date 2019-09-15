class game {
	constructor(){
		this.id = '';
		this.players = [];
		this.board = new GAME_BOARD();
	}
	setId(gameid){
		this.id = gameid;
	}

	addPlayer(playerName){
		this.players.push(playerName);
	}

	removePlayer(playerName){
		this.players = this.players.filter( (name) => name != playerName);
	}

	update(){

	}
}

export default game;