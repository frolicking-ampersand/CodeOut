import React, { Component } from 'react';
import axios from 'axios';
import CanvasDraw from './canvasdraw';
import Gallery from './gallery';
import WhiteboardNav from './whiteboard_nav';
import Webcams from './../webcams/webcam-bar';
import PickColor from './colorbox';
import PickBackground from './bgcolorbox';
import auth from "./../auth/auth-helper";
import Login from "./../auth/login";

export default class Whiteboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushColor: '#ffaff5',
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
    this.increaseSize = this.increaseSize.bind(this);
    this.decreaseSize = this.decreaseSize.bind(this);
    this.destroy = this.destroy.bind(this);
    this.bringBack = this.bringBack.bind(this);
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

  const indent = {
    'marginTop': '10px'
  }


  const painting = {
    borderWidth: '500px',
    height: '500px',
    left: '500px'
  }

   return (
      <div>
      {this.state.loggedIn ? (
      <div className="animated fadeIn">

      <WhiteboardNav
        pen={() => this.setState({tool: 'pen'})}
        eraser={() => this.setState({tool: 'eraser'})}
        donut={() => this.setState({tool: 'donut'})}
        tunnel={() => this.setState({tool: 'tunnel'})}
        fan={() => this.setState({tool: 'fan'})}
        clear={this.handleOnClickClear}
        bringBack={this.bringBack}
        save={this.saveAnImage}
        increaseSize={this.increaseSize}
        decreaseSize={this.decreaseSize}
        destroy={this.destroy}
        chooseBGParentColor={this.chooseBG}
      />

      <PickBackground
        backgrounde={this.state.canvasStyle.backgroundColor}
        chooseBGParentColor={this.chooseBG}
      />

      <PickColor
        brushColor={this.state.brushColor}
        changeParentColor={event => this.setState({brushColor: event.target.value })}
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