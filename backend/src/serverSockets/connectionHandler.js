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
	}

}

export default connectionHandler;