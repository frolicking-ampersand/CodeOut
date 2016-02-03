import React, { Component } from 'react';
const ReactDOM = require('react-dom');
const Menu = require('react-burger-menu').stack;
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import { Router } from 'react-router';

console.log('trueMenu');

//showCreateBoard() {}
class trueMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCreateBoard: false,
      displayJoin: false,
      name: ''
    };
    //this.socket = io();
    this.handleOnCreate = this.handleOnCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    //this.mixins = [Navigation];
  }

  handleOnCreate() {
    this.setState({
      displayCreateBoard: !this.state.displayCreateBoard
    });
  }

  handleJoin() {
    this.setState({
      displayJoin: !this.state.displayJoin
    });
  }

  handleCreation() {
    socket.emit('create board', this.state.name);
    //this.transitionTo('/canvas');
  }

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    var boardList; //= ['red', 'blue', 'green'];
    // boardList = boardList.map(function(board) {
    //   return <li>{board}</li>
    // })
    axios.get('api/allBoards').then(function(res) {
      //console.log('trying to get: ', "data:image/png;base64," + res.data[0].thing.data);
      boardList = res.data.map(function(board) {
        //var savedImage = new Image();
        console.log(board);
       // savedImage.src = board;
       // console.log(savedImage);

        return <li><img src={board} /></li>
      });
      //trueMenu.setState({ name: 'niki' });
    })
    .catch(function (res) {
      console.log('error retreveing Image');
      console.log(res);
    })

    console.log(boardList);
  
    return (
      <div>
        <p>hello world</p>
        <ToggleDisplay show={ !this.state.displayCreateBoard && !this.state.displayJoin }>
          <button onClick={ this.handleOnCreate }>create</button>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.displayCreateBoard}>
          <input type="text" value={ this.state.name }
            onChange={ this.handleName }/> <br/>
          <button onClick={ this.handleOnCreate }>back</button>
          <button onClick={ this.handleCreation } > Create</button>
          <span>{this.state.name}</span>
        </ToggleDisplay> 
        <ToggleDisplay show ={ !this.state.displayJoin && !this.state.displayCreateBoard }>
          <button onClick={ this.handleJoin }> Join</button>
        </ToggleDisplay>
        <ToggleDisplay show={ this.state.displayJoin }>
          <input type="text"/> <br/>
          <button onClick={ this.handleJoin }>back</button>
          <button> Join</button>
        </ToggleDisplay>
        <a href="/#/canvas"> create board </a>
        <ul>{boardList}</ul>
      </div>
    )
  };
};

// trueMenu.contextTypes = {
//   router: React.PropTypes.func.isRequired
// };

// class creation extends Component {

// }

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
