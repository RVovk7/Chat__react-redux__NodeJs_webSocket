import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatWrap from './ChatWrap.jsx';
import LoginPage from '../components/LoginPage.jsx';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuth: false
        }
    }
     static getDerivedStateFromProps(nextProps) {
            return {
                isAuth: nextProps.isAuth.isAuth,
                isReg: nextProps.isReg.regStatus
            }
    } 
    render() {
        if (this.state.isAuth) {
            return (
                <Switch>
                      <Route patch='/chat' component={ChatWrap} />
                      <Redirect to='chat'/>            
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route patch='/' render={() => (<LoginPage isReg={this.state.isReg} isAuth={this.state.isAuth} />)} /> 
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
Login.propTypes = {
    isReg: PropTypes.object.isRequired,
    isAuth: PropTypes.object.isRequired

}
export default connect(mapStateToProps, mapDispatchToProps)(Login);