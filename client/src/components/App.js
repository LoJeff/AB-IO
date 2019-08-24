import React, {Component} from 'react';
import io from 'socket.io-client';
import connectionEmitter from "../clientSockets/connectionEmitter.js";

class App extends Component {
    constructor(props){
        super(props);
        
        // create socket connection
        const socket = io();
        const connections = new connectionEmitter(socket);
        // functions
        this.joinGameRoom = this.joinGameRoom.bind(this);
        this.dummyFunction = this.dummyFunction.bind(this);
        
        // state
        this.state = {
            connections: connections
        };
    }

    joinGameRoom(){
        var name = document.getElementById("name").value;
        var gameid = document.getElementById("gameid").value;
        this.state.connections.joinGameRoom(name,gameid);
    }

    dummyFunction(){
        this.state.connections.dummyFunction();
    }

    render(){
        return(
            <div>
            	<h3>Enter name</h3>
				<input id="name"></input>
            	<h3>Enter gameid </h3>
            	<input id="gameid"></input>
            	<br/>
            	<button onClick={this.joinGameRoom}>Start</button>
                <br/>
                <button onClick={this.dummyFunction}>TEST</button>
            </div>
        );
    }
}

export default App;
