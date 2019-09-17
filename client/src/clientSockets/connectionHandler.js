// This class handles all the game connections socket handlers
class connectionHandler{
	constructor(client,react){
		this.client = client;
		this.react = react;
	}

	updateReact(newReact){
		this.react = newReact;
	}

	// Notifies the client that a new member has joined the game room
	updateRoomPlayers(data){
		// data
			// data.players
		this.react.setState({"playersList": data.playersList});
	}

	eventHandlers(){
		const client = this.client;
		client.on("updateRoomPlayers",function(data){
			this.updateRoomPlayers(data);
		}.bind(this));
	}

}

export default connectionHandler;