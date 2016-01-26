import React, { Component } from 'react';

const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d')
const radius = 10

class Canvas extends Component {
	constructor(props);
	super(props);

	this.state = ({
		dragging: false
	})
	canvas.addEventListener('mousedown', this.setState({ dragging: true}));
	canvas.addEventListener('mouseup', this.setState({ dragging: false}));
	canvas.addEventListener('mousemove', this.putPoint);

		<div>

		</div>
	}
}