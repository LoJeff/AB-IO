// This class handles all the game connections socket Emitters
class connectionEmitter{
	constructor(server){
		this.server = server;
	}

	broadcast_updateRoomPlayers(data){
		var sendData = {"playersList":data.playersList};
		this.server.to(data.gameid).emit("updateRoomPlayers",sendData);
	}

	broadcast_chatUpdate(data){
		var sendData = {
			from: data.from,
			content: data.content,
			type: data.type
		};
		this.server.to(data.gameid).emit("updateChat",sendData);
	}

	broadcast_gameUpdate(data){
		// console.log("sending update to", data.gameid);
		var sendData = {"time": data.time};
		this.server.to(data.gameid).emit("updateGame",sendData);
	}
}

export default connectionEmitter;