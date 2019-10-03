import React, {Component} from 'react';
import overall from './main.js';

class Game extends Component {
    constructor(props){
        super(props);
        
        // state
        this.state = {
            "receivedPackets": [],
        };
    }

    componentDidMount(){
        this.props.handlers.updateReact(this);
		overall();
    }

    render(){
        const packetList = [];
        if(this.state.receivedPackets !== undefined){
            this.state.receivedPackets.forEach(function(packet,index){
                packetList.push(<li key={index}>{JSON.stringify(packet)}</li>)
            });
        }
        return(
            <div>
				<h1> GAME START</h1>
                <ul>
                    {packetList}
                </ul>
				<canvas id="canvas"></canvas>
            </div>
        );
    }
}

export default Game;
