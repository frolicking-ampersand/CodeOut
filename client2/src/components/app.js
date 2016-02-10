import React, { Component } from 'react';
import ColorPicker from 'react-color';
import ToggleDisplay from 'react-toggle-display';
import CanvasDraw from './canvasdraw';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import Gallery from './gallery';
import WhiteboardNav from './whiteboard_nav'

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
      all: false,
      clear: false,
      restore: false,
      tool: "pen",
      data: [],
    };
    this.showColorBox = this.showColorBox.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.showBGColorBox = this.showBGColorBox.bind(this)
    this.saveAnImage = this.saveAnImage.bind(this);
  }


  componentDidMount(){
    this.updateData();
  }

  updateData(){
    this.setState({
      clear: false,
    })
    axios.get('api/allZeeBoards')
      .then(function(response){
        this.setState({data: response.data});
      }.bind(this))
      .catch(function (response) {
        console.log("error getting data");
        console.log(response);
      });
  }

  eraser() {
    this.setState({
      brushColor: this.state.canvasStyle.backgroundColor
    })
  }

  increaseSize() {
    if (this.state.lineWidth<15){
      this.setState({
        clear: false,
        lineWidth: this.state.lineWidth+=1
      });
    }
  }

  decreaseSize(){
    if(this.state.lineWidth>1){
      this.setState({
        clear: false,
        lineWidth: this.state.lineWidth-=1
      })
    }
  }

  handleOnClickClear()  {
    this.setState({
      restore: false,
      clear: true
    });
  }

  showColorBox() {
    if(!this.state.displayColorPicker){
      this.setState({
        clear: false,
        displayColorPicker: !this.state.displayColorPicker,
        toggleColorBox: "Close Box"
      });
    }else{
      this.setState({
        clear: false,
        displayColorPicker: !this.state.displayColorPicker,
        toggleColorBox: "Pick Color"
      });
    }
  }

  realEraser() {
    if(this.state.tool==="pen"){
      this.setState({
        clear: false,
        restore: false,
        tool: 'eraser',
      })
    } else {
      this.setState({
        clear: false,
        tool: 'pen',
      })
    }
  }


  showBGColorBox() {
    if(!this.state.displayBGColorPicker) {
      this.setState({
        clear: false,
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
    newstate.canvasStyle.backgroundColor = '#' + color.hex;
    newstate.clear = false;
    this.setState({
      clear: false,
      newstate
    });
  }

  chooseColor(color) {
    this.setState({brushColor: '#' + color.hex})
  }

  saveAnImage () {

    let that = this;
    let newCanvas = document.getElementById("canvas")
    let savedImage = new Image()
    savedImage.src = newCanvas.toDataURL('image/png')
    axios.post('/api/boards', {
        thing: savedImage.src,
        name: 'saved'
      })
      .then(function (response) {
        that.updateData();
      })
      .catch(function (response) {
        console.log("ERROR saving");
        console.log(response);
      });


  }

  restoreBoard(){
    let that = this;
    this.setState({
      //clear: true,
      restore: true
    });
  }

  giveMeAllBoards(){
    this.setState({
      clear: true,
      all: true
    })
  }

  render() {
    let popupPosition = {
      position: 'absolute',
      top: '12%',
      left: '5%',
    };

    let indent = {
      'margin-top': '10px'
    }

   return (
      <div>
       <WhiteboardNav />
          <div class = "row" className='btn-toolbar' >
          <ButtonToolbar className = "toolbar">
            <Button bsStyle = "primary" bsSize = "large" onClick={this.handleOnClickClear.bind(this)}>Clear</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.showColorBox}>{this.state.toggleColorBox}</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.showBGColorBox}>{this.state.toggleBGBox}</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.saveAnImage}> Save </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.restoreBoard.bind(this)}> Restore </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.increaseSize.bind(this)}> thicker </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.decreaseSize.bind(this)}> thinner </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.eraser.bind(this)}> eraser </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.realEraser.bind(this)}> real </Button>
          </ButtonToolbar>
          </div>
          <div className='canvas-style'>
            <CanvasDraw {...this.state}/>
          </div>
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
          <div style={indent}>
          <Gallery data={this.state.data} className="painting"/>
          </div>
      </div>
    )
  }
};

export default App;