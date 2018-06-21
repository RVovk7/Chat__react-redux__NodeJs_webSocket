import React, { Component } from 'react';
import ChatWrap from './ChatWrap.jsx';
import LoginPage from '../components/LoginPage.jsx';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuth: null
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if(nextProps.isAuth !== '0')  {
            return {
                isAuth: nextProps.isAuth[0]
            }
        }
        else {
            return null
        }
    
    }
    render() {
        if (this.state.isAuth === "+") {
            return (
                <Switch>
                      <Route patch='/chat' component={ChatWrap} />
                      <Redirect to='chat'/>            
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route patch='/' render={() => (<LoginPage isReg={this.props.isReg} isAuth={this.state.isAuth} />)} /> 
                </Switch>
            )
        }

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