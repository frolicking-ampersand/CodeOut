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

  fan(){
    this.setState({
      tool: 'fan',
    })
  }

  pen() {
    this.setState({
      tool: 'pen',
    })
  }

  donut() {
    this.setState({
      tool: 'donut',
    })
  }

  tunnel() {
    this.setState({
      tool: 'tunnel',
    })
  }

  realEraser() {
    this.setState({
      tool: 'eraser',
    })
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

  Destroy() {
    let newCanvas = document.getElementById("canvas");
    let context = newCanvas.getContext("2d");
    let savedImage = new Image();
    let width = newCanvas.width;
    let height = newCanvas.height;
    context.clearRect(0, 0, width, height);
  }

  bringBack() {
    let newCanvas = document.getElementById("canvas");
    let context = newCanvas.getContext("2d");
    let savedImage = new Image();
    let width = newCanvas.width;
    let height = newCanvas.height;

    axios.get('api/lastBoard')
      .then(function (response) {
        console.log("response data ",response);
        savedImage.src = response.data;
        if(response.data){
          context.clearRect(0, 0, width, height);
          context.drawImage(savedImage,0,0);
        }
      })
      .catch(function (response) {
        console.log("error restoring image");
        console.log(response);
      });
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
            <Button bsStyle = "primary" bsSize = "large" onClick={this.showColorBox}>{this.state.toggleColorBox}</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.showBGColorBox}>{this.state.toggleBGBox}</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.saveAnImage}> Save </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.increaseSize.bind(this)}> Thicker </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.decreaseSize.bind(this)}> Thinner </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.realEraser.bind(this)}> Eraser </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.Destroy.bind(this)}> Destroy </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.bringBack.bind(this)}> BringBack </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.fan.bind(this)}> Fan </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.pen.bind(this)}> Pen </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.donut.bind(this)}> Donut </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.tunnel.bind(this)}> Tunnel </Button>
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
