import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat.jsx';
import ws from './util/';

 ReactDOM.render(<Chat />, document.querySelector('#mount_place'));