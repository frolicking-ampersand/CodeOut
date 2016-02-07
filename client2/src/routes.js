import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Menu from './components/menu';
import App from './components/app';
import CodeEditor from './components/code_editor';

export default (
	<div>
		<Route path="/" component={Menu} />
		<Route path="/canvas" component={App} />
		<Route path="/code" component={CodeEditor} />
	</div>
);
