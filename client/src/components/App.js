import React, {Component} from 'react';
import io from 'socket.io-client';
import connectionEmitter from "../clientSockets/connectionEmitter.js";
import '../css/login_page_styles.css';

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
            <html>
			  <head>
				<meta charset="UTF-8" />
				<title>Player Data Submission Page</title>
				<link rel="stylesheet" href="../css/login_page_styles.css"/>
			  </head>
			  <body>
				
				<div id="title_container" class="title">
					<h2>Auto Battle IO</h2>
				</div>
				
				<div id="interactive_set">
					<div class="row_of_input">
						<div id="IGN_input_container">
							<form > <input type="text" placeholder="Enter your IGN EIGJSLEIJGISEJGOISJEGISJEGLJSELGIJLSEGIJlg"/> </form>
						</div>
						<div id="Game_ID_input_container">
							<form > <input type="text" placeholder="Enter your game lobby ID"/> </form>
						</div>
					</div>
					
					<div id="submit_button_container">
						<button type="button">Submit User Data</button>
					</div>
				</div>
				

			  </body>
			</html>
        );
    }
}

export default App;
