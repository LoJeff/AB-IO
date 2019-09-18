import React, {Component} from 'react';

class Lobby extends Component {
    constructor(props){
        super(props);

        this.leaveGameRoom = this.leaveGameRoom.bind(this);
        this.startGame = this.startGame.bind(this);

        // state
        this.state = {
            "playersList": [],
        };
    }

    componentDidMount(){
        this.props.handlers.updateReact(this);
    }

    leaveGameRoom(){
        this.props.emitters.leaveGameRoom(this.props.clientName,this.props.gameid);
        // update data
        this.props.updateGameid("");

        // trigger page change
        this.props.triggerPageChange("login");
    }

    startGame(){
        // if(this.state.playersList.length === 6){
            // emit game start to server
            this.props.emitters.startGame(this.props.gameid);
            // trigger page change
            this.props.triggerPageChange("game");
        // }
    }


    render(){
        const playersListElements = [];
        if(this.state.playersList !== undefined){
            this.state.playersList.forEach(function(player){
                playersListElements.push(<li key={player.id}>{player.name} (id:{player.id})</li>)
            });
        }

        return(
            <div>
                <h1>Hi {this.props.clientName}</h1>
                <h1>Current room id: {this.props.gameid}</h1>
                <br/>
                <h1>Players List</h1>
                <ul>
                    {playersListElements}
                </ul>
                <button onClick={this.leaveGameRoom}>Exit</button>
                <button onClick={this.startGame}>Start Game</button>
			</div>
        );
    }
}

export default Lobby;
