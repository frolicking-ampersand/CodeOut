import React, { Component } from 'react';
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
      allBoards: []
    };
    this.grabBoards();
  }

  componentWillMount () {

  }

  grabBoards() {
    var component = this;
    axios.get('api/allBoards')
      .then(function (data) {
        console.log("THE DATA FROM grabBoards IS ", data);
        component.setState({allBoards: data});
        console.log("NOW, this.state.allBoards IS", component.state.allBoards);
      })
      .catch(function (err) {
        console.log("Received the following error while trying to grab all boards:", err);
      });
  }

  render() {
    console.log('INSIDE THE RENDER FUNCTION, this.state.allBoards READS______________________________________:', this.state.allBoards);
  	return (
    	<div>
        <Navbar loggedIn={this.state.loggedIn} />
        {this.state.loggedIn ? (
          <div>
          <CreateRoom />
    		  <h3> Join Existing Room </h3>
          <RoomList onRoomSelect={
          selectedRoom => this.setState({selectedRoom})}
          rooms={this.state.allBoards} />
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
