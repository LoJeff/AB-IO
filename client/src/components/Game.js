import React, {Component} from 'react';

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
            </div>
        );
    }
}

export default Game;
