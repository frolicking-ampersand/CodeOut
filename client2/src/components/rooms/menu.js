import React, { Component } from 'react';
import CreateRoom from "./menu_createRoom";
import auth from './../auth/auth-helper';
import Login from './../auth/login';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn(),
    };
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <div>
          <CreateRoom />
          </div>
        ) : (
          <div>
          <Login />
          </div>
        )}
      </div>
    );
  }
}

