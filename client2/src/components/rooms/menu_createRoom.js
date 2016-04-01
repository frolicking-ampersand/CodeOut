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
      userId: 0,
      list: []
    };
    this.handleName = this.handleName.bind(this);
    this.handleJoination = this.handleJoination.bind(this);
  }

  handleJoination(e) {
    e.preventDefault();
    if(this.state.name === ''){
      this.setState({name: "Please enter a room name"})
      return;
    }
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
    return (
      <div className="center-roomselect">
        <img src='./media/collaboration.jpg' id="bgvid" />
        <form onSubmit={this.handleJoination}>
        <input
        className="search-style"
        placeholder="Join a room"
        value={this.state.name}
        onChange={(e) => this.handleName(e)}
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



