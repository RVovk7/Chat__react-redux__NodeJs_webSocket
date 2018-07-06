import React, { Component } from 'react';
export default function ChatControl({enterPress}) {
        return (
            <div className="chat-message clearfix">
                <textarea ref={this.props.textSendRef} onKeyDown={enterPress}  name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                <button onClick={this.props.sendClick}>Send</button>
            </div>
        );
    
}
