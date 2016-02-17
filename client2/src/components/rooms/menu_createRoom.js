import React, { Component } from 'react';
import axios from 'axios';
import { Router, Link, browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

class trueMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayCreateBoard: false,
      displayJoin: false,
      name: '',
      userId: 0,
      list: []
    };
    this.handleName = this.handleName.bind(this);
    this.handleJoination = this.handleJoination.bind(this);
  }

  handleJoination(e) {
    socket = io();
    console.log(socket);
    socket.emit('create board', {name: this.state.name});
  }

  handleName(event) {
    window.roomName = event.target.value;
    this.setState({
      name: event.target.value
    });
  }

  render() {

    const searchStyle = {
    'border': '2px solid #FF0000',
    'height': '45px',
    'width': '60%',
    'font-size': '30px',
    'border-radius': '3px',
    'color': 'white',
    'text-align': 'center',
    'border-width': '1px',
    'border-color': 'navy',
    'background': 'black',
    'margin-top': '14%'
  }

  const buttonStyle = {
    'margin-top': '15px'
  }

  const imgUrl = './images/collaboration.jpg'
  const centerMe = {
    'textAlign': 'center',
    'height': '100%',
  }

    return (
      <div style={centerMe}>
      <img src='./media/collaboration.jpg' id="bgvid" />
      <input
      style={searchStyle}
      placeholder="Join a room"
      value={this.state.name}
      onChange={this.handleName}
       />
      <p>
      <button style={buttonStyle} onClick={this.handleJoination}><Link to="/canvas">Enter Room</Link></button>
      </p>
      </div>
    )
  };
};

trueMenu.contextTypes = {
  router: function(){
    return React.PropTypes.func.isRequired
  }
};


export default trueMenu;
