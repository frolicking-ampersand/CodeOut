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
		'fontSize': '30px',
		'borderRadius': '3px',
		'color': 'white',
		'textAlign': 'center',
		'borderWidth': '1px',
		'borderColor': 'navy',
		'background': 'black'
	}
	 return (
		<div className="search-bar">
			<input
			style={searchStyle}
			placeholder="Search for a video with a friend!"
			value={this.state.term}
			onChange={event => this.onInputChange(event.target.value)} />
		</div>
		)
	}
}

