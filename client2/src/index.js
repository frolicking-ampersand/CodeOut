import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DrawableCanvas from 'react-drawable-canvas';
import ColorPicker from 'react-color';
import ToggleDisplay from 'react-toggle-display';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
      toggleBGBox: 'Choose Background',
      toggleColorBox: 'Pick Color',
			brushColor: '#000000',
      lineWidth: 4,
      displayColorPicker: false,
      displayBGColorPicker: false,
      canvasStyle: {
        backgroundColor: '#FFFFFF'
      },
      clear: false
	  };
    this.showColorBox = this.showColorBox.bind(this);
	  this.chooseColor = this.chooseColor.bind(this);
    this.showBGColorBox = this.showBGColorBox.bind(this)
  }

	handleOnClickClear()  {
    this.setState({
      clear: true
    });
  }

  showColorBox() {
    if(!this.state.displayColorPicker){
      this.setState({
        displayColorPicker: !this.state.displayColorPicker,
        toggleColorBox: "Close Box"
      });
    }else{
      this.setState({
        displayColorPicker: !this.state.displayColorPicker,
        toggleColorBox: "Pick Color"
      });
    }
  }

  showBGColorBox() {
    if(!this.state.displayBGColorPicker) {
      this.setState({
        displayBGColorPicker: !this.state.displayBGColorPicker,
        toggleBGBox: "Close Box"
       });
    } else {
      this.setState({
        displayBGColorPicker: !this.state.displayBGColorPicker,
        toggleBGBox: "Choose Background"
      });
    }
  }

  chooseBG(color) {
    let newstate = this.state;
    console.log(newstate)
    newstate.canvasStyle.backgroundColor = '#' + color.hex;
    newstate.clear = false;
    this.setState({
      newstate
    });
  }

  chooseColor(color) {
    this.setState({brushColor: '#' + color.hex})
  }


	render() {
    let popupPosition = {
      position: 'absolute',
      top: '12%',
      left: '5%',
    };

    return (
        <div className='canvas-state' style={{height: '500px'}}>
          <h1>Frolicking Ampersands</h1>
        <div className='button-bar'>
          <button onClick={ this.handleOnClickClear.bind(this) }>Clear</button>
          <button onClick={ this.showColorBox }>{this.state.toggleColorBox}</button>
          <button onClick={ this.showBGColorBox }>{this.state.toggleBGBox}</button>

        </div>
        <DrawableCanvas {...this.state}/>

        <ToggleDisplay show={this.state.displayColorPicker}>
          <ColorPicker
              type="sketch"
              positionCSS={ popupPosition }
              color={ this.state.brushColor }
              onChangeComplete={ this.chooseColor.bind(this) } />
        </ToggleDisplay>

        <ToggleDisplay show={this.state.displayBGColorPicker}>
          <ColorPicker
              type="sketch"
              positionCSS={ popupPosition }
              color= {this.state.canvasStyle.backgroundColor}
              onChangeComplete={ this.chooseBG.bind(this) } />
        </ToggleDisplay>
        </div>
		)
	}
};


ReactDOM.render(<App />, document.querySelector('.container'));