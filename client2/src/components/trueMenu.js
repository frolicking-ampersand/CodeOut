import React from 'react';
const ReactDOM = require('react-dom');
const Menu = require('react-burger-menu').stack;

const NavBar = () => {
  return (
    <div>
    <Menu> 
      <a href=""> create board </a>
    </Menu>  
    </div>
    );
}

export default NavBar
