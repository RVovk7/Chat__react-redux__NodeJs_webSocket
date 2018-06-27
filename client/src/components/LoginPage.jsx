import React, { Component } from 'react';
import authorize from '../api';
class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isReg: false,
            isAuth: false
        }
    }
    static getDerivedStateFromProps(nextProps) {
        return {
            isReg: nextProps.isReg,
            isAuth: nextProps.isAuth
        }
    }
    singClick = () => {
        this.classToggle.classList.toggle('s--signup');
    };
    keyPressReg = e => {
        if (e.keyCode === 13) this.regClick();
        if (e.keyCode === 27) {
            this.regLogin.value = ''
            this.regEmail.value = ''
            this.regPass.value = ''
        };
    }
    keyPressAuth = e => {
        if (e.keyCode === 13) this.authClick();
        if (e.keyCode === 27) {
            this.uName.value = ''
            this.uPass.value = ''
        };
    }
    regClick = () => {
        let login = this.regLogin.value,
            email = this.regEmail.value,
            pass = this.regPass.value
        const emailRegex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
        const emailValid = emailRegex.test(email);
        if (emailValid && login.trim() && pass.trim()) {
            const authData = {
                login,
                email,
                pass
            }
            authorize.isReg(authData);
        }

        else {
            this.regLogin.value = ''
            this.regEmail.value = ''
            this.regPass.value = ''
            this.regStatus.innerHTML = 'Incorrect input!';
            this.regStatus.style.color = 'red';
            this.regStatus.style.visibility = 'visible';
            setTimeout(() => {
                this.regStatus.style.visibility = 'hidden';
            }, 777);
            this.regLogin.focus()
        }
    }
    authClick = () => {
        let userName = this.uLogin.value,
            pass = this.uPass.value;
        sessionStorage.setItem('auth', name);
        const data = {
            userName,
            pass
        };
        authorize.isAuth(data);

    }
    componentDidUpdate() {
        if (!this.state.isAuth) {
            this.uLogin.value = '';
            this.uPass.value = '';
            this.logFail.style.visibility = 'visible';
            setTimeout(() => {
                this.logFail.style.visibility = 'hidden'
            }, 777);
        }
        if (!this.state.isReg) {
            this.regStatus.innerHTML = "Login is already exist";
            this.regStatus.style.color = 'red';
            this.regLogin.value = '';
            this.regEmail.value = '';
            this.regPass.value = '';
            this.regLogin.focus();
            this.regStatus.style.visibility = 'visible';
            setTimeout(() => {
                this.regStatus.style.visibility = 'hidden';
            }, 777);
        }
        if (this.state.isReg) {
            this.regStatus.innerHTML = 'registration is Successful';
            this.regStatus.style.color = 'green';
            this.regLogin.value = '';
            this.regEmail.value = '';
            this.regPass.value = '';
            this.regStatus.style.visibility = 'visible';
            setTimeout(() => {
                this.regStatus.style.visibility = 'hidden';
                this.singClick()
            }, 777);
        }
    }
    render() {
       
        return (
            <div ref={div => this.classToggle = div} className="cont">
                <div className="form sign-in">
                    <label>
                        <h2 ref={log => this.logFail = log} style={{ visibility: 'hidden', color: 'red' }} >Login or password is incorrect</h2>
                        <span>Login</span>
                        <input onKeyDown={this.keyPressAuth} ref={e => this.uLogin = e} type="name" />
                    </label>
                    <label >
                        <span>Password</span>
                        <input onKeyDown={this.keyPressAuth} ref={e => this.uPass = e} type="password" />
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="button" onClick={this.authClick} className="submit">Sign In</button>
                    <button type="button" className="fb-btn">Connect with <span>facebook</span></button>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>New here?</h2>
                            <p>Sign up and discover great amount of new opportunities!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>If you already has an account, just sign in. We've missed you!</p>
                        </div>
                        <div onClick={this.singClick} className="img__btn">
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2 ref={h2 => this.regStatus = h2} style={{ visibility: 'hidden' }} ></h2>

                        <label>

                            <span>Login</span>
                            <input onKeyDown={this.keyPressReg} type="text" ref={e => this.regLogin = e} />
                        </label>
                        <label>
                            <span>Email</span>
                            <input onKeyDown={this.keyPressReg} type="email" ref={e => this.regEmail = e} />
                        </label>
                        <label >
                            <span>Password</span>
                            <input onKeyDown={this.keyPressReg} type="password" ref={e => this.regPass = e} />
                        </label>
                        <button type="button" onClick={this.regClick} className="submit">Sign Up</button>
                        <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginPage;