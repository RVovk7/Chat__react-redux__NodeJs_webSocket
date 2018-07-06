import React, { Component } from 'react';
import '../styles/main.scss';
import { Provider } from 'react-redux';
import Login from './Login.jsx';
import store from '../store';
import {BrowserRouter as Router, Route} from 'react-router-dom';
localStorage.removeItem('auth'); 

const App = () => <Provider store={store}>
    <div className="container clearfix">
    <Router>
        <Route patch='/' component={Login} />
        </Router>
    </div>
</Provider>

export default (App);
