// This class handles all the connection events that
// are emitted from the client
class connectionEmitter {
	constructor(client){
		this.client = client;
	}

	joinGameRoom(nickname,gameid){
		const client = this.client;
		const data = {"gameid": gameid, "name": nickname};
		client.emit("joinGameRoom",data);
	}

	leaveGameRoom(nickname,gameid){
		const client = this.client;
		const data = {"gameid": gameid, "name": nickname};
		console.log(data);
		client.emit("leaveGameRoom",data);
	}

	dummyFunction() {
		const client = this.client;
		client.emit("dummyFunction");
		console.log("emitted dummyFunction event");
	}
}

export default connectionEmitter;