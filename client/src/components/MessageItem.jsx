import React, { Component } from 'react';
export default class MessageItem extends Component {
    state = {}
    render() {
        const { color, time, text, author } = this.props;
        const select = document.querySelector('#mount_place > div > div > div.chat > div.chat-history > ul > li:nth-child(1) > div.message.other-message.float-right');

        console.log('color=>', color)

        return (
            <li className="clearfix">
                <div className="message-data align-right">
                    <span className="message-data-time" >{/* new Date(+this.props.time) */}</span> &nbsp; &nbsp;
  <span className="message-data-name" >{author}</span> <i className="fa fa-circle me"></i>

                </div>
                <div style={{ background: color }} className="message other-message float-right">
                    {text}
                </div>
            </li>
        );
    }
};

