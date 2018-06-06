import React from 'react';
import {render} from 'react-dom';
import ws from './util/';
import App from './containers/App.jsx';

window.ws = ws;

render(<App />, document.querySelector('#mount_place'));