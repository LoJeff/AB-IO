// This class handles all the game connections socket handlers
class connectionHandler{
	constructor(client){
		this.client = client;
	}

	// Notifies the client that a new member has joined the game room
	updateRoomPlayers(data,react){
		// data
			// data.players
		react.setState({"players": data.players});
		console.log("update room list",data.players);
	}

	eventHandlers(react){
		const client = this.client;
		client.on("updateRoomPlayers",function(data){
			this.updateRoomPlayers(data,react);
		}.bind(this));
	}

}

export default connectionHandler;