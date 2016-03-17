import React, { Component } from 'react';
import { Router, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';
window.socket = io();
window.roomName;

ReactDOM.render(<Router history={hashHistory} routes={routes} />, document.body);
