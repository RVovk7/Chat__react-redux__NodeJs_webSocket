import React, { Component } from 'react';
export default function ChatHeader({messageCount}){
        return (
            <div className="chat-header clearfix">
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />

            <div className="chat-about">
                <div className="chat-with">Chat </div>
                <div className="chat-num-messages">already {messageCount}  message</div>
            </div>
            <i className="fa fa-star"></i>
        </div>
        );
};

