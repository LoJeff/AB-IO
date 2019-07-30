import express from 'express';
import http from 'http'
import socketio from 'socket.io'
import routes from './routes.js'
import eventHandlers from './serverSockets/eventHandlers.js'
import path from 'path'

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/',routes);

io.on('connection', function(socket){
	console.log("socket has connected");
	eventHandlers(io,socket);
});

server.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

