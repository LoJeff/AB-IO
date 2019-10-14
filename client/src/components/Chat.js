import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

class Chat extends Component {
    constructor(props){
        super(props);

        this.sendMessage = this.sendMessage.bind(this);
        this.scrollChatDown = this.scrollChatDown.bind(this);
        // state
        this.state = {
            "chatLog": []
        };
    }

    componentDidMount(){
        this.props.handlers.updateChatReact(this);
        // Get request to chat Log
        fetch('/api/game/'+ this.props.gameid + '/chatLog').then((response)=>{
            return response.json();
        }).then((jsonResult)=>{
            if(jsonResult.error != undefined){
                console.log(jsonResult);
            } else{         
                this.setState({chatLog: jsonResult.chatLog});
                this.scrollChatDown();
            }
        });
    }

    scrollChatDown(){
        var element = document.getElementById("chatScroll");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    sendMessage(event){
        var chat_msg = document.getElementById("chat_input").value;
        var data = {
                        from: this.props.clientName,
                        content: chat_msg
                    };

        fetch('/api/game/'+ this.props.gameid + '/chatLog',{
            method:"post",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }).catch(function(err){
            console.log(err);
        });

        document.getElementById("chat_input").value = "";
        event.preventDefault();
    }

    render(){
        const messageList = [];
        if(this.state.chatLog !== undefined){
            this.state.chatLog.forEach(function(message, i){
                if(message.type === "serverAnnouncement"){
                    messageList.push(<li className="chat__serverAnnouncement" key={i}>{message.content}</li>)
                }
                else if (message.type === "chatMessage") {
                    messageList.push(<li className="chat__chatMessage" key={i}><strong>{message.from}: </strong>{message.content}</li>)
                }
                
            });
        }

        return(
            <div id="chat">
                <div className="chat__Header"><p>Messages</p></div>
                <div id="chatScroll" className="chat__messageWrapper">
                    <ul className="chat__messageList">
                        {messageList}
                    </ul>
                </div>
                <form className="chat__form" autoComplete="off" onSubmit={this.sendMessage}>
                    <input id="chat_input" type="text" className="chat__input" name="chatInput"  placeholder="Type your message..."></input>
                    <button type="submit" className="chat__submit"><FontAwesomeIcon icon={faPaperPlane}/></button>
                </form>
            </div>
        );
    }
}

export default Chat;