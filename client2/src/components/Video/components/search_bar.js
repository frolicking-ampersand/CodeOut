import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = { term: ''}
	}
	componentDidMount() {
		this.socket = io();
		this.socket.on('searchTyping', function (data) {
      this.setState({term: data.term});
      this.props.onSearchTermChange(data.term);
    }.bind(this));
	}
	onInputChange(term) {
		this.socket.emit('startSearch', { term: term});
		this.setState({term});
		this.props.onSearchTermChange(term);
	}

	render() {
	const searchStyle = {
		'border': '2px solid #FF0000',
		'height': '50px',
		'width': '100%',
		'font-size': '30px',
		'border-radius': '3px',
		'color': 'navy',
		'text-align': 'center',
		'border-width': '1px',
		'border-color': 'navy'
	}
	 return (
		<div className="search-bar">
			<input
			style={searchStyle}
			placeholder="Search for a video to watch with a friend!"
			value={this.state.term}
			onChange={event => this.onInputChange(event.target.value)} />
		</div>
		)
	}
}

