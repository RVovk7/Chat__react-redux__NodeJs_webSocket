import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChatHeader from '../components/ChatHeader.jsx';
import MessageItem from '../components/MessageItem.jsx';
import ChatControl from '../components/ChatControl.jsx';
import ws from '../util';
let colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
colors.sort((a, b) => Math.random() > 0.5);
sessionStorage.setItem('userColor',colors.shift());
colors.push(sessionStorage.getItem('userColor'));
class MessageList extends Component {
    constructor(props) {
        super(props);
        this.textSendRef = React.createRef();
        this.myRef = React.createRef();
        this.state = {};
    }
    componentDidUpdate = () => {
        this.chatWrap.scrollTop = this.ul.scrollHeight;
    }
    enterPress = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.sendClick();
            this.textSendRef.current.value = '';
        };
    }
    sendClick = e => {
    
        ws.emit({
            type: "textMSG",
            text: this.textSendRef.current.value,
            author: sessionStorage.getItem('auth'),
            color: sessionStorage.getItem('userColor')   ///if you have troble with message color =>fix intro
        });
    }
    render() {
        return (
            <div className="chat">
                <ChatHeader messageCount={this.props.messages.length} />
                <div className="chat-history" ref={chatWrap => this.chatWrap = chatWrap}>
                    <ul ref={ul => this.ul = ul}>
                        {this.props.messages.map(m => <MessageItem key={m.time} time={m.time} text={m.text} author={m.author} color={m.color} />)}
                    </ul>
                </div>
                <ChatControl textSendRef={this.textSendRef} sendClick={this.sendClick} enterPress={this.enterPress} />
            </div>


        );
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messageReducer,
        people: state.peopleReducer
    }
}
MessageList.propTypes = {
    message: PropTypes.array,
    people: PropTypes.array.isRequired

}
export default connect(mapStateToProps)(MessageList);