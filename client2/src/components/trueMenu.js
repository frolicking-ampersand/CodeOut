import React from 'react';
const ReactDOM = require('react-dom');
const Menu = require('react-burger-menu').stack;
import axios from 'axios';

const NavBar = () => {
  render() {
    axios.get('api/boards')

    var boardList = this.state.data.map(function(board) {
      return <li>{board}</li>
    });
    return <ul>{boardList}<ul>
  }
  return (
    <div>
    <Menu> 
      <a href=""> create board </a>
    </Menu>  
    </div>
    );
}

export default NavBar
