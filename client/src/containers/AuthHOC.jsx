import React, { Component } from 'react';
import ws from '../util';
import Modal from 'react-modal';
export default (ChildComponent) => {
    return class AuthHOC extends Component {
        constructor(props) {
            super(props)
            this.state = {
                isLogged: false
            }
        }
        keyPress = e => {
if (e.keyCode === 13) this.auth();
if (e.keyCode ===27) this.input.value = '';
        }
        auth = () => {
            let name = this.input.value;



            sessionStorage.setItem('auth', name);
            const data = {
                type: "userMSG",
                name
            };

            if (name.trim()) {
                this.setState({
                    isLogged: true
                })
                ws.emit(data);
            }

        }
        singClick = () => {
            document.querySelector('.cont').classList.toggle('s--signup');
        }
        noName() {
            return <div classNameName="noName">
                You didn`t enter name :c
                <button onClick={() => { location.reload() }}>Try again</button>
            </div>
        }
        registr() {
            return (
                <div className="cont">
                    <div className="form sign-in">
                        <h2>Welcome back,</h2>
                        <label>
                            <span>Name</span>
                            <input onKeyDown={this.keyPress} ref={input => this.input = input} type="name" />
                        </label>
                        {/*  <label>
                            <span>Password</span>
                            <input type="password" />
                        </label> */}
                        <p className="forgot-pass">Forgot password?</p>
                        <button type="button" onClick={this.auth} className="submit">Sign In</button>
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
                            <h2>Time to feel like home,</h2>
                            <label>
                                <span>Name</span>
                                <input type="text" />
                            </label>
                            <label>
                                <span>Email</span>
                                <input type="email" />
                            </label>
                            {/*  <label>
                                <span>Password</span>
                                <input type="password" />
                            </label> */}
                            <button type="button" className="submit">Sign Up</button>
                            <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                        </div>
                    </div>
                </div>
            )
        }
        render() {
            return (
                this.state.isLogged ? <ChildComponent /> : this.registr()
            )
        }
    }
}