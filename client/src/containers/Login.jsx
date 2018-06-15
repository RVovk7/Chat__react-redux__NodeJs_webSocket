import React, { Component } from 'react';
import ChatWrap from './ChatWrap.jsx';
import LoginPage from '../components/LoginPage.jsx';
import ws from '../util';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props)
        this.uName = React.createRef();
        this.uPass = React.createRef();
        this.authLogin = React.createRef();
        this.authEmail = React.createRef();
        this.authPass = React.createRef();
        this.state = {
            isLogged: false,
            isReg: false
        }
    }
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.isAuth !== '0') {
            return {
                isLogged: nextProps.isAuth[0]
            }
        }
        if (nextProps.isReg !== null) {
            return {
                isReg: nextProps.isReg[0]
            }
        }
        return null
    }
    keyPressReg = e => {
        if (e.keyCode === 13) this.regClick();
        if (e.keyCode === 27) {
            this.authLogin.current.value = ''
            this.authEmail.current.value = ''
            this.authPass.current.value = ''
        };
    }
    componentDidUpdate() {
        if (this.state.isLogged === '-' && this.state.isReg !== '-' && this.state.isReg !== '+') this.authFail();
        if (this.state.isReg !== '0' && this.state.isLogged !== '-') {
            this.child.regStatusClick(this.state.isReg);
            this.authLogin.current.value = ''
            this.authEmail.current.value = ''
            this.authPass.current.value = ''
            this.authLogin.current.focus()
        }
    }
    keyPressAuth = e => {
        if (e.keyCode === 13) this.authClick();
        if (e.keyCode === 27) {
            this.uName.current.value = ''
            this.uPass.current.value = ''
        };
    }
    authClick = () => {
        let name = this.uName.current.value;
        let pass = this.uPass.current.value;
        sessionStorage.setItem('auth', name);
        const data = {
            type: "userMSG",
            name,
            pass
        };
        ws.emit(data);

    }
    authFail = () => {
        this.child.authClick();
        this.uName.current.value = ''
        this.uPass.current.value = ''
        this.uName.current.focus()
    }
    regClick = () => {
        let login = this.authLogin.current.value,
            email = this.authEmail.current.value,
            pass = this.authPass.current.value
        const emailRegex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
        const emailValid = emailRegex.test(email);
        if (emailValid && login.trim() && pass.trim()) {
            const authData = {
                type: 'auth',
                login,
                email,
                pass
            }
            ws.emit(authData);
        }
        else {
            this.child.regStatusClick('inputFail');
            this.authLogin.current.value = ''
            this.authEmail.current.value = ''
            this.authPass.current.value = ''
            this.authLogin.current.focus()
        }
    }
    render() {
        return (
            this.state.isLogged === '+' ? <ChatWrap /> : <LoginPage ref={instance => { this.child = instance; }}
                isLogged={this.state.isLogged} keyPressAuth={this.keyPressAuth}
                keyPressReg={this.keyPressReg} regClick={this.regClick}
                uName={this.uName} uPass={this.uPass}
                authClick={this.authClick} authLogin={this.authLogin}
                authEmail={this.authEmail} authPass={this.authPass} isReg={this.props.isReg} />
        )
    }

}
const mapStateToProps = state => {

    return {
        isReg: state.regReducer,
        isAuth: state.authReducer
    }
}
const mapDispatchToProps = dispatch => {
    return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);