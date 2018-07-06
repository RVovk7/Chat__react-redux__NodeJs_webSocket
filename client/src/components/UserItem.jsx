import React from 'react';
export default function UserItem({userName}){
    return (

        <li key={props.userID} className="clearfix">
            <img src={props.avatar} alt="avatar" />
            <div className="about">
                <div className="name">{userName}</div>
                <div className="status">
                    <i className="fa fa-circle online"></i> online
    </div>
            </div>
        </li>
    )
} 