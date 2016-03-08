import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import Menu from './components/rooms/menu';
import Video from './components/video/'
import Whiteboard from './components/whiteboard/whiteboard';
import CodeEditor from './components/code-editor/code_editor';
import Login from './components/auth/login';

export default (
	<div>
		<Route path="/" component={Menu} />
		<Route path="/canvas" component={Whiteboard} />
    <Route path="/code" component={CodeEditor} />
    <Route path="/login" component={Login} />
		<Route path="/video" component={Video} />
		<Route path="/logout" component={Menu} />
	</div>
);
