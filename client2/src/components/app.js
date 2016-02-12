import React, { Component } from 'react';
import CanvasDraw from './canvasdraw';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import Gallery from './gallery';
import WhiteboardNav from './whiteboard_nav';
import Webcams from './webcam-bar';
import PickColor from './canvas/colorbox';
import PickBackground from './canvas/bgcolorbox';
import auth from "../auth-helper";
import Login from "./login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushColor: '#000000',
      loggedIn: auth.loggedIn(),
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#FFFFFF'
      },
      all: false,
      clear: false,
      restore: false,
      tool: "pen",
      data: [],
    };
    this.saveAnImage = this.saveAnImage.bind(this);
    this.chooseBG = this.chooseBG.bind(this);
    this.changeColors = this.changeColors.bind(this);
    this.increaseSize = this.increaseSize.bind(this);
    this.decreaseSize = this.decreaseSize.bind(this);
    this.realEraser = this.realEraser.bind(this);
    this.destroy = this.destroy.bind(this);
    this.bringBack = this.bringBack.bind(this);
    this.fan = this.fan.bind(this);
    this.pen = this.pen.bind(this);
    this.donut = this.donut.bind(this);
    this.tunnel = this.tunnel.bind(this);
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

  changeColors (color) {
    this.setState({brushColor: color.target.value })
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

  chooseBG(color) {
    let newstate = this.state;
    newstate.canvasStyle.backgroundColor = color.target.value;
    this.setState({
      newstate
    });
  }

  destroy() {
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

    let indent = {
      'margin-top': '10px'
    }

   return (
      <div>
      {this.state.loggedIn ? (
      <div>
      <Webcams />

      <WhiteboardNav
        pen={this.pen}
        eraser={this.realEraser}
        clear={this.handleOnClickClear}
        bringBack={this.bringBack}
        save={this.saveAnImage}
        donut={this.donut}
        tunnel={this.tunnel}
        fan={this.fan}
        increaseSize={this.increaseSize}
        decreaseSize={this.decreaseSize}
        destroy={this.destroy}
      />

      <PickColor
        brushColor={this.state.brushColor}
        changeParentColor={this.changeColors}
      />

      <PickBackground
        backgroundColor={this.state.backgroundColor}
        chooseBGParentColor={this.chooseBG}
      />

      <div className='canvas-style'>
        <CanvasDraw {...this.state}/>
      </div>

      <div style={indent}>
      <Gallery data={this.state.data} className="painting"/>
      </div>
      </div>
      ) : (
        <div>
        <Login />
        </div>
      )}
    </div>
    )
  }
};

export default App;
