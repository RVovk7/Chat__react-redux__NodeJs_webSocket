import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatHeader from '../components/ChatHeader.jsx';
import MessageItem from '../components/MessageItem.jsx';
import ChatControl from '../components/ChatControl.jsx';
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
    sendClick = e => {
        e.preventDefault();
        console.log('messageText',this.textSendRef.current.value)
    }
    render() {
        return (
            <div className="chat">
                <ChatHeader />
                <div className="chat-history" ref={chatWrap => this.chatWrap = chatWrap}>
                    <ul ref={ul => this.ul = ul}>
                        {this.props.messages.map(m => <MessageItem key={m.time} text={m.text} author={m.author} color={m.color} />)}
                    </ul>
                </div>
                <ChatControl textSendRef={this.textSendRef} sendClick={this.sendClick} />
            </div>


        );
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messageReducer
    }
}
const mapDispatchToProps = dispatch => {
    return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);