import React from 'react';
import PropTypes from 'prop-types';
export default function MessageItem({ color, time, text, author }) {
    const messageTime = new Date(time);
    console.log('MessageItem=>',messageTime);
    return (
        <li className="clearfix">
            <div className="message-data align-right">
                <span className="message-data-time" >{messageTime.toLocaleString().split(',')[1]}</span> &nbsp; &nbsp;
  <span className="message-data-name" >{author}</span> <i className="fa fa-circle me"></i>

            </div>
            <div style={{ background: color }} className="message other-message float-right">
                {text}
            </div>
        </li>
    );
}
MessageItem.propTypes = {
    color : PropTypes.string.isRequired,
    time : PropTypes.number.isRequired,
    text : PropTypes.string.isRequired,
    author : PropTypes.string.isRequired
};
