import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Menu from './components/menu';
import Video from './components/Video/'
import App from './components/app';
import CodeEditor from './components/code_editor';
import Login from './components/login';
import trueMenu from './components/trueMenu';
import Webcams from './components/webcams';

export default (
	<div>
		<Route path="/" component={Menu} />
		<Route path="/canvas" component={App} />
    <Route path="/code" component={CodeEditor} />
    <Route path="/login" component={Login} />
		<Route path="/code" component={CodeEditor} />
		<Route path="/video" component={Video} />
		<Route path="/logout" component={Menu} />
	</div>
);
