import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const Menu = require('react-burger-menu').stack;
import axios from 'axios';
import ToggleDisplay from 'react-toggle-display';
import { Router, Link, browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
// import { createHistory, useBasename } from 'history';
// import { Router, Route, Link, History, Lifecycle } from 'react-router';
// import reactMixin from 'react-mixin';

// const history = useBasename(createHistory)({
//   basename: '/transitions'
// });
// console.log('trueMenu');

//showCreateBoard() {}
class trueMenu extends Component {
  //mixins: [Lifecycle, History],

  constructor(props) {
    super(props);

    this.state = {
      displayCreateBoard: false,
      displayJoin: false,
      name: '',
      userId: 0,
      list: []
    };
    //this.socket = io();
    this.handleOnCreate = this.handleOnCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.handleJoination = this.handleJoination.bind(this);
    this.getList = this.getList.bind(this);
    this.getList();
    //this.altJoin = this.altJoin.bind(this);
    //this.mixins = [Navigation];
  }

  // contextTypes () {
  //   return React.PropTypes.func
  // }


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

  altJoin(name) {
    //e.preventDefault();
    console.log('altJoining: ' + name);
    this.setState({
      name: name
    });
    socket.emit('join board', { name: name, userId: this.state.userId });
    //this.handleJoination(null, name);
  }

  handleJoination(e) {
    e.preventDefault();

    console.log('joining');
    socket.emit('join board', { name: this.state.name, userId: this.state.userId });
  }

  handleCreation(e) {
    e.preventDefault();
    console.log('creating');
    socket.emit('create board', {name: this.state.name,
                                 userId: this.state.userId });

    console.log('gone');

    

  }

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }

  getList() {
    var that = this;
    console.log('getting list');
    axios.get('api/allBoards').then(function(res) {
      //console.log('trying to get: ', "data:image/png;base64," + res.data[0].thing.data);
      console.log(res.data);
      var boardList = res.data.boards.map(function(board) {
        //var savedImage = new Image();
        console.log(board.name);
       // savedImage.src = board;
       // console.log(savedImage);

        return <li><Link to='/canvas'  onClick={ that.altJoin.bind(that, board.name) }>
        {board.name}</Link></li>
      });
      console.log(res.data.userId);

      that.setState({
        list: boardList,
        userId: res.data.userId
      }); 
      //trueMenu.setState({ name: 'niki' });
    })
    .catch(function (res) {
      console.log('error retreveing Image');
      console.log(res);
    });

  }

  render() {
     //= ['red', 'blue', 'green'];
    // boardList = boardList.map(function(board) {
    //   return <li>{board}</li>
    // })
    // axios.get('api/allBoards').then(function(res) {
    //   //console.log('trying to get: ', "data:image/png;base64," + res.data[0].thing.data);
    //   boardList = res.data.map(function(board) {
    //     //var savedImage = new Image();
    //     console.log(board.name);
    //    // savedImage.src = board;
    //    // console.log(savedImage);

    //     return <li><board.name</li>
    //   });
    //   //trueMenu.setState({ name: 'niki' });
    // })
    // .catch(function (res) {
    //   console.log('error retreveing Image');
    //   console.log(res);
    // })

    return (
      <div>
        <ToggleDisplay show={ !this.state.displayCreateBoard && !this.state.displayJoin }>
          <button onClick={ this.handleOnCreate }>create</button>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.displayCreateBoard}>
          <input type="text" value={ this.state.name }
            onChange={ this.handleName }/> <br/>
          <button onClick={ this.handleOnCreate }>back</button>
         <button onClick={ this.handleCreation }><Link to="/canvas"> Create </Link></button>
          <span>{this.state.name}</span>
        </ToggleDisplay> 
        <ToggleDisplay show ={ !this.state.displayJoin && !this.state.displayCreateBoard }>
          <button onClick={ this.handleJoin }> Join</button>
        </ToggleDisplay>
        <ToggleDisplay show={ this.state.displayJoin }>
          <input type="text" value={ this.state.name }
            onChange={ this.handleName }/> <br/>
          <button onClick={ this.handleJoin }>back</button>
          <button onClick={ this.handleJoination }><Link to="/canvas"> Join</Link></button>
        </ToggleDisplay>
        <a href="/#/canvas"> create board </a>
        <ul>{ this.state.list }</ul>
      </div>
    )
  };
};
// reactMixin(trueMenu.prototype, History);
// reactMixin(trueMenu.prototype, Lifecycle);
trueMenu.contextTypes = {
  router: function(){
    return React.PropTypes.func.isRequired
  }
};


export default trueMenu;
