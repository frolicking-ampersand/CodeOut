import React, { Component } from 'react';
import ReactDOM from "react-dom";
import CreateRoom from "./menu_createRoom";
import Navbar from "./menu_navbar";
import axios from "axios";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBoards: undefined
    };
  }

  componentDidMount() {
    this.grabBoards();
  }

  grabBoards() {
    var component = this;
    axios.get('api/allBoards')
      .then(function (data) {
        console.log("THE DATA FROM grabBoards IS ", data);
        component.setState({
          allBoards: data
        });
        console.log("NOW, this.state.allBoards IS", component.state.allBoards);
      })
      .catch(function (err) {
        console.log("Received the following error while trying to grab all boards:", err);
      });
  }

  render() {
  	return (
  	<div>
      <Navbar />
      <header>
        <CreateRoom />
  		  <h3>Choose Your Room</h3>
      </header>
    </div>
  	);
  }
}

export default Menu;
