import React from 'react';
import ReactDOM from 'react-dom';
import ws from './util/';
import App from './containers/App.jsx';
window.ws = ws;
 ReactDOM.render(<App />, document.querySelector('#mount_place'));