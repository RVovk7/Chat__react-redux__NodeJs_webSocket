import React, { Component } from 'react';
import '../styles/main.scss';
import { Provider } from 'react-redux';
import ChatWrap from './ChatWrap.jsx';
import store from '../store';
//import {hot}from 'react-hot-loader';
localStorage.removeItem('auth'); 

const App = () => <Provider store={store}>
    <div className="container clearfix">
        <ChatWrap />
    </div>
</Provider>


export default (App);