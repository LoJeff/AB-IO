// This class handles all the game connections socket Emitters
class connectionEmitter{
	constructor(server){
		this.server = server;
	}

	broadcast_updateRoomPlayers(data){
		var sendData = {"playersList":data.playersList};
		this.server.to(data.gameid).emit("updateRoomPlayers",sendData);
	}
}

export default connectionEmitter;