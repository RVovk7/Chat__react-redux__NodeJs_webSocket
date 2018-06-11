import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatHeader from '../components/ChatHeader.jsx';
import MessageItem from '../components/MessageItem.jsx';
import ChatControl from '../components/ChatControl.jsx';
import ws from '../util';
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
            author: this.props.people[this.props.people.length-1].userName
        });
    }
    render() {
        return (
            <div className="chat">
                <ChatHeader messageCount={this.props.messages.length} />
                <div className="chat-history" ref={chatWrap => this.chatWrap = chatWrap}>
                    <ul ref={ul => this.ul = ul}>
                        {this.props.messages.map(m => <MessageItem key={m.time} text={m.text} author={m.author} color={m.color} />)}
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
const mapDispatchToProps = dispatch => {
    return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);