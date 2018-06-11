import React, { Component } from 'react';
import ws from '../util';
export default (ChildComponent) => {
    return class AuthHOC extends Component {
        auth() {
            if( localStorage.getItem('auth')) return true;
            let name = prompt('Enter your name');
            if (!name || !name.trim().length) {
                return false
            }
            localStorage.setItem('auth',name);
            const data = {
                type : "userMSG",
                name
            }
            ws.emit(data);
            return true;
        }
        noName() {
            return <div className="noName">
                You didn`t enter name :c
                <button onClick={() => { location.reload() }}>Try again</button>
            </div>
        }
        render() {
            return (
                this.auth() ? <ChildComponent /> : this.noName()
            )
        }
    }
}