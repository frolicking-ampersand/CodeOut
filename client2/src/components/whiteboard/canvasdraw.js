import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';

export default class CanvasDraw extends Component {
  constructor(props){
    super(props)
    this.state = {
      canvas: null,
      context: null,
      drawing: false,
      lastX: 0,
      lastY: 0,
      tool: 'pen',
      history: []
    }
  }
  componentDidMount(){
    let canvas = ReactDOM.findDOMNode(this);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let ctx = canvas.getContext('2d');

    this.setState({
      canvas: canvas,
      context: ctx
    });

    socket.on('draw', (data) => {
      this.state.context.beginPath();
      this.draw(data.lX, data.lY, data.cX, data.cY, data.color, data.tool);
    })

    socket.on('newb', (data) => {
      let newbCanvas = document.getElementById('canvas');
      let newbImage = newbCanvas.toDataURL('image/png');
      socket.emit('newbImg', {id: data, image: newbImage});
    })

    let con = this.state.context;
    socket.on('newbImg', (data) => {
      var currentImage = new Image();
      currentImage.src = data;
      ctx.drawImage(currentImage, 0, 0);
    })
  }


  handleOnMouseDown(e) {
    let rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    if(this.isMobile()){
      this.setState({
        lastX: e.targetTouches[0].pageX - rect.left,
        lastY: e.targetTouches[0].pageY - rect.top
      });
    } else {
      this.setState({
        lastX: e.clientX - rect.left,
        lastY: e.clientY - rect.top
      });
    }

    this.setState({ drawing: true });
  }

  handleOnMouseMove(e) {
    if(this.state.drawing){
      let rect = this.state.canvas.getBoundingClientRect();
      let lastX = this.state.lastX;
      let lastY = this.state.lastY;
      let currentX;
      let currentY;
      if(this.isMobile()){
        currentX =  e.targetTouches[0].pageX - rect.left;
        currentY = e.targetTouches[0].pageY - rect.top;
      }
      else{
        currentX = e.clientX - rect.left;
        currentY = e.clientY - rect.top;
      }


      this.draw(lastX, lastY, currentX, currentY);
      var that = this;
      socket.emit('draw', {
        lX: lastX,
        lY: lastY,
        cX: currentX,
        cY: currentY,
        color: that.props.brushColor,
        tool: that.props.tool
      });
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  }
  handleonMouseUp() {
    this.setState({
      drawing: false
    });
  }

  draw(lX, lY, cX, cY, color){
    console.log(this.props.tool);
    this.state.context.strokeStyle = color || this.props.brushColor;
    this.state.context.lineWidth = this.props.lineWidth;
    if (this.props.tool==='pen'||this.props.tool==='fan'){
      this.state.context.moveTo(lX,lY);
      this.state.context.lineTo(cX,cY);
      this.state.context.stroke();
      if(this.state.context.tool==='fan'){
        ctx.beginPath();
        ctx.arc(lX,lY,50,0,Math.PI*2,true);
        ctx.stroke();
      }
    } else if(this.state.context.tool==='eraser') {
      this.state.context.arc(lX,lY,8,0,Math.PI*2,false);
      this.state.context.clearRect(lX,lY,50, 50);
    } else if (this.state.context.tool === 'donut'||'tunnel') {
      if (this.state.context.tool==='donut'){
        this.state.context.arc(lX,lY,100,0,Math.PI*2,true);
      } else if (this.state.context.tool==='tunnel') {
        this.state.context.arc(lX,lY,lX,0,Math.PI*2,true);
      }
      this.state.context.stroke();
    }
  }

  giveMeAllBoards(){
    let con = this.state.context;
    let savedImage = new Image();
     axios.get('/api/allZeeBoards')
     .then(function (response) {
       for (var i=0; i<response.data.length; i++){
        console.log(response.data[i]);
       }
     })
     .catch(function (response) {
       console.log("error restoring image");
       console.log(response);
     });
 }

  getDefaultStyle(){
    return {
      backgroundColor: '#FFFFFF',
      cursor: 'crosshair'
    }
  }

  canvasStyle(){
    const defaults =  this.getDefaultStyle();
    const custom = this.props.canvasStyle;
    return Object.assign({}, defaults, custom);
  }
  isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <canvas
        className="animated slideInUp"
        id="canvas"
        style={this.canvasStyle()}
      <canvas id="canvas" style = {this.canvasStyle()}
        onMouseDown = {this.handleOnMouseDown.bind(this)}
        onTouchStart = {this.handleOnMouseDown.bind(this)}
        onMouseMove = {this.handleOnMouseMove.bind(this)}
        onTouchMove = {this.handleOnMouseMove.bind(this)}
        onMouseUp = {this.handleonMouseUp.bind(this)}
        onTouchEnd = {this.handleonMouseUp.bind(this)}
      >
      </canvas>
    )
  }
}


CanvasDraw.propTypes = {
    brushColor: PropTypes.string,
    lineWidth: PropTypes.number,
    canvasStyle: PropTypes.shape({
      backgroundColor: PropTypes.string,
      cursor: PropTypes.string
    }),
    clear: PropTypes.bool,
    tool: PropTypes.string,
}

CanvasDraw.defaultProps = {
    brushColor: '#000000',
    lineWidth: 4,
    canvasStyle: {
      backgroundColor: '#FFFFFF',
      cursor: 'pointer'
    },
    clear: false,
}


