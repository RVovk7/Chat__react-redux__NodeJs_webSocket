import React, { Component } from 'react';
import PeopleList from '../containers/PeopleList.jsx';
import MessageList from '../containers/MessageList.jsx';
class ChatWrap extends Component {
    render() {
        return (
            <div>
                <PeopleList />
               <MessageList />
            </div>
        );
    }
}

export default ChatWrap;