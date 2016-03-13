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
    window.location.assign('/#/canvas')
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
    'fontSize': '30px',
    'borderRadius': '3px',
    'color': 'white',
    'textAlign': 'center',
    'borderWidth': '1px',
    'borderColor': 'navy',
    'background': 'black',
    'marginTop': '14%'
  }

  const buttonStyle = {
    'marginTop': '15px'
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
      <button style={buttonStyle} className="btn btn-primary" onClick={this.handleJoination}>Enter Room</button>
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
