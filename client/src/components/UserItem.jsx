import React from 'react';

const UserItem = (props) => (
        <li key={props.key} className="clearfix">
            <img src={props.avatar} alt="avatar" />
            <div className="about">
                <div className="name">{props.userName}</div>
                <div className="status">
                    <i className="fa fa-circle online"></i> online
</div>
            </div>
        </li>
    
)
export default UserItem;