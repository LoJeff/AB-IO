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

	updateGame(data){
		var newState = this.react.state.receivedPackets;
		newState.push(data);
		this.react.setState({"receivedPackets": newState});
	}

	eventHandlers(){
		const client = this.client;
		client.on("updateRoomPlayers",function(data){
			this.updateRoomPlayers(data);
		}.bind(this));

		client.on("updateGame",function(data){
			console.log("HIHHI");
			this.updateGame(data);
		}.bind(this));
	}

}

export default connectionHandler;