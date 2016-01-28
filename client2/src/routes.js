import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Menu from './components/menu';
import App from './components/app'

export default (
	<div>
		<Route path="/" component={Menu} />
		<Route path="/canvas" component={App} />
	</div>
);