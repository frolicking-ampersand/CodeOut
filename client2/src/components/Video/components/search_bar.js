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
	 return (
		<div className="search-bar">
			<input
			className="video-search"
			placeholder="Search for a video with a friend!"
			value={this.state.term}
			onChange={event => this.onInputChange(event.target.value)} />
		</div>
		)
	}
}

