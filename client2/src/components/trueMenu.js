import React, { Component } from 'react';
const ReactDOM = require('react-dom');
const Menu = require('react-burger-menu').stack;
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';

console.log('trueMenu');

//showCreateBoard() {}
class trueMenu extends Component {
  constuctor(props) {
    //super(props);
    this.state = {
      displayCreateBoard: false
    };
  }

  handleOnCreate() {
    if (!this.state.displayCreateBoard) {}
  }

  render() {
    var boardList = ['red', 'blue', 'green'];
    boardList = boardList.map(function(board) {
      return <li>{board}</li>
    })
    // axios.get('api/boards').then(function(res) {
    //   console.log('trying to get');
    //   boardList = res.map(function(board) {
    //     return <li>{board}</li>
    //   });
    // });
  
    return (
      <div>
        <p>hello world</p>
        <button onClick={ this.handleOnCreate.bind(this) }>create</button>
        <a href="/#/canvas"> create board </a>
        <ul>{boardList}</ul>
      </div>
    )
  };


};

// const NavBar = () => {
//   var boardList; //= ['red', 'blue', 'green'];
//   axios.get('api/boards').then(function(res) {
//     console.log('trying to get');
//     boardList = res.map(function(board) {
//       return <li>{board}</li>
//     });
//   });
  // boardList = boardList.map(function(board) {
  //   return <li>{board}</li>
  // })

    
//   return (
//   <div>
//     <p>hello world</p>
//     // <ToggleDisplay show=
//     <a href="/#/canvas"> create board </a>
//     <ul>{boardList}</ul>
//   </div>
//   )
  
// };

export default trueMenu;
