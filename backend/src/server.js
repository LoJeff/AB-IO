import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import routes from './routes.js';
import connectionHandler from './serverSockets/connectionHandler.js';
import connectionEmitter from './serverSockets/connectionEmitter.js';
import path from 'path';
import globalData from './globalData.js';

global.data = new globalData();

const app = express();
const server = http.createServer(app);
const io = socketio(server);



app.use(express.static(path.join(__dirname, '../../client/build')));
app.use('/',routes);

io.on('connection', function(socket){
	console.log("socket has connected");
	global.handler = new connectionHandler(io,socket);
	global.emitter = new connectionEmitter(io);

	// turn on event listeners
	global.handler.eventHandlers();
});

server.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

