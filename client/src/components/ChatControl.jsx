import React, { Component } from 'react';
export default class ChatControl extends Component {
   
    render() {
        return (
            <div className="chat-message clearfix">
                <textarea ref={this.props.textSendRef}  name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                <button onClick={this.props.sendClick}>Send</button>
            </div>
        );
    }
}
