import React, { Component } from 'react';
export default class ChatControl extends Component {
    state = {  }
    render() {
        return (
            <div className="chat-message clearfix">
                    <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                    <button>Send</button>

                </div>
        );
    }
}
