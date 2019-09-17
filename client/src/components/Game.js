import React, {Component} from 'react';

class Game extends Component {
    constructor(props){
        super(props);
        
        // state
        this.state = {
        };
    }

    componentDidMount(){
        this.props.handlers.updateReact(this);
    }

    render(){
        return(
            <div>
				<h1> GAME START</h1>
            </div>
        );
    }
}

export default Game;
