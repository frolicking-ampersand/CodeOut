
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DrawableCanvas from 'react-drawable-canvas';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			brushColor: '#000000',
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#FFFFFF'
      },
      clear: false
	  };
	}

	handleOnClickClear()  {
    this.setState({
      clear: true
    });
  }
  handleOnClickChangeColorYellow() {
    this.setState({
      brushColor: '#FFFF00',
      clear: false
    });
  }
  handleOnClickChangeColorBlack() {
  	console.log(this);
    this.setState({
      brushColor: '#000000',
      clear: false
    });
  }
  handleOnClickChangBgToRed() {
    let newstate = this.state;
    newstate.canvasStyle.backgroundColor = '#FF0000';
    newstate.clear = false;
    this.setState({
      newstate
    });
  }
  handleOnClickChangBgToBlue() {
    let newstate = this.state;
    newstate.canvasStyle.backgroundColor = '#00FFDC';
    newstate.clear = false;
    this.setState({
      newstate
    });
  }


	render() {
		return (
		 		<div className='canvas-state' style={{height: '500px'}}>
	        <p>Frolicking Ampersands</p>
        <div className='button-bar'>
          <button onClick={ this.handleOnClickClear.bind(this) }>Clear</button>
          <button onClick={ this.handleOnClickChangeColorYellow.bind(this) }>Yellow</button>
          <button onClick={ this.handleOnClickChangeColorBlack.bind(this) }>Black</button>
          <button onClick={ this.handleOnClickChangBgToRed.bind(this) }>Change Background to Red</button>
          <button onClick={ this.handleOnClickChangBgToBlue.bind(this) }>Change background to Blue</button>
        </div>
        <DrawableCanvas {...this.state}/>
        </div>
		)
	}
};


ReactDOM.render(<App />, document.querySelector('.container'));