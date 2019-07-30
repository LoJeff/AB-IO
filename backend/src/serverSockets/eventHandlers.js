// This file will hold all the server socket event handlers
// from the different files.
import connectionHandler from './connectionHandler.js';

module.exports = function (server, client) {
	new connectionHandler(server,client).eventHandlers();
}