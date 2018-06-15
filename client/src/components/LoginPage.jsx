import React, { Component } from 'react'
class LoginPage extends Component {
    authClick = () => {
        if (this.props.isLogged === '-') {
            this.logFail.style.visibility = 'visible';
           
            setTimeout(() => {
                this.logFail.style.visibility = 'hidden'
            }, 2000);
        }
      
    }
    singClick = () => {
        this.classToggle.classList.toggle('s--signup');
    };    
    regStatusClick = status => {
        if (this.props.isReg[0] === '-') {
            this.regStatus.innerHTML =   "Login is already exist";
            this.regStatus.style.color = 'red';
            this.regStatus.style.visibility = 'visible';
            setTimeout(() => {
                this.regStatus.style.visibility = 'hidden';
               
            }, 777);
        }
        if (this.props.isReg[0] === '+') {
            this.regStatus.innerHTML = 'registration is Successful';
            this.regStatus.style.color = 'green';
            this.regStatus.style.visibility = 'visible';
            setTimeout(() => {
                this.regStatus.style.visibility = 'hidden';
                this.singClick()
            }, 777);
        }
        if (status === 'inputFail'){
            this.regStatus.innerHTML = 'Incorrect input!';
            this.regStatus.style.color = 'red';
            this.regStatus.style.visibility = 'visible';
            setTimeout(() => {
                this.regStatus.style.visibility = 'hidden';
            }, 777);
        }
        
       
    }
    singClick = () => {
        this.classToggle.classList.toggle('s--signup');
    };

  


render() {
    return (
        <div ref={div => this.classToggle = div} className="cont">
            <div className="form sign-in">

                <label>
                    <h2 ref={log => this.logFail = log} style={{  visibility: 'hidden',color:'red' }} >Login or password is incorrect</h2>
                    <span>Login</span>
                    <input onKeyDown={this.props.keyPressAuth} ref={this.props.uName} type="name" />
                </label>
                <label >
                    <span>Password</span>
                    <input onKeyDown={this.props.keyPressAuth} ref={this.props.uPass} type="password" />
                </label>
                <p className="forgot-pass">Forgot password?</p>
                <button type="button" onClick={this.props.authClick} className="submit">Sign In</button>
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
                <h2 ref={h2 => this.regStatus = h2} style={{  visibility: 'hidden' }} ></h2>

                    <label>

                        <span>Login</span>
                        <input onKeyDown={this.props.keyPressReg} type="text" ref={this.props.authLogin} />
                    </label>
                    <label>
                        <span>Email</span>
                        <input onKeyDown={this.props.keyPressReg} type="email" ref={this.props.authEmail} />
                    </label>
                    <label >
                        <span>Password</span>
                        <input onKeyDown={this.props.keyPressReg} type="password" ref={this.props.authPass} />
                    </label>
                    <button type="button" onClick={this.props.regClick} className="submit">Sign Up</button>
                    <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                </div>
            </div>
        </div>
    );
}
}
export default LoginPage;