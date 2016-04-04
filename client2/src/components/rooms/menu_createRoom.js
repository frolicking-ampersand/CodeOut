import React, { Component } from 'react';
import axios from 'axios';
import { Router, Link } from 'react-router';
import { Button } from 'react-bootstrap';

export default class trueMenu extends Component {

  constructor(props) {
    super();
    this.state = {
      displayCreateBoard: false,
      displayJoin: false,
      name: '',
      placeholder: 'Join a room',
      userId: 0,
      list: [],
      isValid: true
    };
    this.handleName = this.handleName.bind(this);
    this.handleJoination = this.handleJoination.bind(this);
  }

  handleJoination(e) {
    e.preventDefault();
    if(this.state.name === ''){
      this.setState({placeholder: "Please enter a room name", isValid: false})
      return;
    } else if (this.state.name.indexOf(' ') !== -1){
      this.setState({placeholder: "Room names can not contain spaces", name: '', isValid: false})
      return;
    }else if (/[^a-zA-Z0-9\-\/]/.test(this.state.name)) {
      this.setState({placeholder: "Special characters are not allowed", name: '', isValid: false})
      return;
    }
    socket.emit('create board', {name: this.state.name});
    window.location.assign('/#/code')
  }

  handleName(event) {
    window.roomName = event.target.value;
    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
      <div className="center-roomselect">
        <img src='./media/collaboration.jpg' id="bgvid" />
        <form className="animated fadeInUp" onSubmit={this.handleJoination}>
        <input
        placeholder={this.state.placeholder}
        value={this.state.name}
        onChange={(e) => this.handleName(e)}
        className={!this.state.isValid ? 'animated shake search-style' : 'search-style'}
        />
        <p>
          <button className="btn btn-primary button-spacing"
                  onClick={this.handleJoination}>Enter Room
          </button>
        </p>
        </form>
      </div>
    )
  };
};



