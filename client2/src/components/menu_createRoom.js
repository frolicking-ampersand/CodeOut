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
      list: undefined
    };
    //this.socket = io();
    this.handleOnCreate = this.handleOnCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.handleJoination = this.handleJoination.bind(this);
    this.getList = this.getList.bind(this);
    this.getList();
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

  handleJoination(e) {
    e.preventDefault();
    console.log('joining');
    socket.emit('join board', this.state.name);
  }

  handleCreation(e) {
    e.preventDefault();
    console.log('creating');
    socket.emit('create board', this.state.name);
    //this.context.router.transitionTo('/#/canvas');
    // this.props.history.push('/#/canvas');
    console.log('gone');
    // axios.post('api/boards', {
    //   name: this.state.name
    // })
    //   .then(function (responce) {

    //   })
    //   .catch(function (responce) {

    //   });

  }

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }

  getList() {
    var that = this;
    axios.get('api/allBoards').then(function(res) {
      //console.log('trying to get: ', "data:image/png;base64," + res.data[0].thing.data);
      var boardList = res.data.map(function(board) {
        //var savedImage = new Image();
        console.log(board.name);
       // savedImage.src = board;
       // console.log(savedImage);

        return <li>board.name</li>
      });
      that.setState({
        list: boardList
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
        <p>hello world</p>
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
