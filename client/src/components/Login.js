import React, {Component} from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        
        // functions
        this.joinGameRoom = this.joinGameRoom.bind(this);
        this.dummyFunction = this.dummyFunction.bind(this);
        
        // state
        this.state = {
        };
    }

    componentDidMount(){
        this.props.handlers.updateReact(this);
        document.getElementById("name").value = this.props.clientName;
    }

    joinGameRoom(){
        var name = document.getElementById("name").value;
        var gameid = document.getElementById("gameid").value;
        this.props.emitters.joinGameRoom(name,gameid);

        // update data
        this.props.updateGameid(gameid);
        this.props.updateClientName(name);

        // trigger page change
        this.props.triggerPageChange("lobby");
    }

    dummyFunction(){
        // this.props.emitters.dummyFunction();
    }

    render(){
        return(
            <div>
				<div id="title_container" className="title">
					<h2>Auto Battle IO</h2>
				</div>
				
				<div id="interactive_set">
					<div className="row_of_input">
						<div id="IGN_input_container">
							<form > <input type="text" id="name" placeholder="Enter your IGN" /></form>
						</div>
						<div id="Game_ID_input_container">
							<form > <input type="text" id="gameid" placeholder="Enter your game lobby ID"/> </form>
						</div>
					</div>
					
					<div id="submit_button_container">
						<button type="button" onClick={this.joinGameRoom}>Submit</button>
					</div>
                    <button onClick={this.dummyFunction}>Jeff's button</button>
				</div>
            </div>
        );
    }
}

export default Login;
