import React from 'react';
const ReactDOM = require('react-dom');
const Menu = require('react-burger-menu').stack;
import axios from 'axios';

console.log('trueMenu');

const NavBar = () => {
  var boardList; //= ['red', 'blue', 'green'];
  axios.get('api/boards').then(function(res) {
    console.log('trying to get');
    boardList = res.map(function(board) {
      return <li>{board}</li>
    });
  });
  // boardList = boardList.map(function(board) {
  //   return <li>{board}</li>
  // })

    
  return (
  <div>
    <p>hello world</p>
    <a href="/#/canvas"> create board </a>
    <ul>{boardList}</ul>
  </div>
  )
  
};

export default NavBar
