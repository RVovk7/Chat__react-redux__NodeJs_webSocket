import React, { Component } from 'react';
import ChatWrap from './ChatWrap.jsx';
import ws from '../util';
import { connect } from 'react-redux';

   class Login extends Component {
        constructor(props) {
            super(props)
            this.state = {
                isLogged: false,
                isRegister : false
            }
        }
        keyPress = e => {
            if (e.keyCode === 13) this.authClick();
            if (e.keyCode === 27) this.uName.value = '';
        }
        authClick = () => {
            let name = this.uName.value;

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
        regClick = () => {
            const authData = {
                type: 'auth',
                login: this.authLogin.value,
                email: this.authEmail.value,
                pass: this.authPass.value
            }
            this.authLogin.value = ''
                this.authEmail.value= ''
              this.authPass.value = ''
            ws.emit(authData);
         setTimeout(() => {
            this.setState({
                isRegister: this.props.isReg
            })
         }, 200); 
        }
        singClick = () => {


            document.querySelector('.cont').classList.toggle('s--signup');
        }

        registr() {
            return (
                <div className="cont">
                    <div className="form sign-in">
                        <h2>Welcome back,</h2>
                        <label>
                            <span>Login</span>
                            <input onKeyDown={this.keyPress} ref={input => this.uName = input} type="name" />
                        </label>
                        <label >
                            <span>Password</span>
                            <input type="password" />
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
                            <h2>Time to feel like home,</h2>
                            
                            <label>
                          
                                <span>Login</span>
                                <input type="text"  ref={input => this.authLogin = input} />
                            </label>
                            <label>
                                <span>Email</span>
                                <input type="email" ref={input => this.authEmail = input} />
                            </label>
                            <label >
                                <span>Password</span>
                                <input type="password" ref={input => this.authPass = input} />
                            </label>
                            <button type="button" onClick={this.regClick} className="submit">Sign Up</button>
                            <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                        </div>
                    </div>
                </div>
            )
        }
        render() {
            return (
                this.state.isLogged ? <ChatWrap /> : this.registr()
            )
        }
        
    }
   

const mapStateToProps = state => {
    //console.log('LoginMapState',state)
    return {
       isReg : state.regReducer
    }
}
const mapDispatchToProps = dispatch => {
    return { dispatch };
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);