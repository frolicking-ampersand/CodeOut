import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CreateRoom from "./menu_createRoom";
import Navbar from "./menu_navbar";
import RoomList from "./menu_roomList";
import axios from "axios";
import Login from "./login";
import auth from "../auth-helper";

class Menu extends Component {
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

export default Menu;
