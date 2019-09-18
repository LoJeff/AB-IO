import React, {Component} from 'react';
import io from 'socket.io-client';
import connectionEmitter from "../clientSockets/connectionEmitter.js";
import connectionHandler from "../clientSockets/connectionHandler.js";
import "../css/login_page_styles.css";

// Component imports
import Login from './Login.js';
import Lobby from './Lobby.js';
import Game from './Game.js';

class App extends Component {
    constructor(props){
        super(props);
        
        // create socket connection
        const socket = io();
        const emitters = new connectionEmitter(socket);
        const handlers = new connectionHandler(socket,this);

        this.triggerPageChange = this.triggerPageChange.bind(this);
        this.updateGameid = this.updateGameid.bind(this);
        this.updateClientName = this.updateClientName.bind(this);
        
        // state
        this.state = {
            emitters: emitters,
            handlers: handlers,
            pageState: "login",
            gameid: "",
            clientName: "",
        };
    }

    componentDidMount(){
        this.state.handlers.updateReact(this);
        // Turn on event listening handlers
        this.state.handlers.eventHandlers();
    }

    triggerPageChange(newPage){
        this.setState({pageState: newPage});
    }

    // Login Page
    updateGameid(newGameId){
        this.setState({gameid: newGameId});
    }

    updateClientName(newName){
        this.setState({clientName: newName});
    }

    // Lobby Page

    render(){
        if(this.state.pageState === "login"){
            return(<Login emitters={this.state.emitters}
                          handlers={this.state.handlers}
                          triggerPageChange={this.triggerPageChange} 
                          updateGameid={this.updateGameid}
                          updateClientName={this.updateClientName}
                          clientName={this.state.clientName}
                          />);
        }
        else if (this.state.pageState === "lobby"){
            return(<Lobby emitters={this.state.emitters}
                          handlers={this.state.handlers}
                          triggerPageChange={this.triggerPageChange}
                          updateGameid={this.updateGameid}
                          gameid={this.state.gameid}
                          clientName={this.state.clientName}
                          />);
        }
        else if(this.state.pageState === "game"){
            return(<Game  emitters={this.state.emitters}
                          handlers={this.state.handlers}
                          triggerPageChange={this.triggerPageChange}
                          />);
        }
        else{
            return(<h1>Page not found </h1>);
        }
    }
}

export default App;
