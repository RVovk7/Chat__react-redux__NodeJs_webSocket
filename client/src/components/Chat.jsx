import React, { Component } from 'react';
import '../styles/main.scss';
import {Provider} from 'react-redux';
import PeopleList from '../containers/PeopleList.jsx';
import MessageList from '../containers/MessageList.jsx';
import store from '../store';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return ( 
            <Provider store={store}>
                <div className="container clearfix">
                   <PeopleList/>
           <MessageList/>
            </div>
            </Provider>
        );
    }
}

export default Chat;