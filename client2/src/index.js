import React, { Component } from 'react';
import { Router, browswerHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';
window.socket = io();

ReactDOM.render(<Router history={browswerHistory} routes={routes} />, document.body);
