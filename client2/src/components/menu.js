import React, { Component } from 'react';
import ReactDOM from "react-dom";

class Menu extends Component {

  render() {
  	return (
  	<div>
    	<header>
  		  <h3>Choose Your Room</h3>
        <a href="/#/canvas"> Board</a>
        <a href="/#/code"> Code Editor</a>
        <a href="/#/menu"> Menu</a>
      </header>
    </div>
  	);
  }
}

export default Menu;
