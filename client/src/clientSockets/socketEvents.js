// This file will hold all the client socket event handlers
// from the different files.
import connectionHandler from './connectionHandler.js';
import connectionEmitter from './connectionEmitter.js';

function eventHandlers (client,react) {
	new connectionHandler(client).eventHandlers(react);
}

class eventEmitters {
	constructor(client){
		this.client = client;
		this.connection = new connectionEmitter(client);
	}
}

export {
	eventHandlers,
	eventEmitters
}