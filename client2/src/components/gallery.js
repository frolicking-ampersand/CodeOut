//<canvas className="canvasPic"></canvas>
//"src/components/images/road.png"
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slider from 'react-slick';
import ReactCanvas from 'react-canvas';
const Surface = ReactCanvas.Surface;
const Imagine = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const obj = {key:0, dataArr:[]};
const obj2 = {key:-1};
const increase = function(){
  obj2.key++;
}

const picStorage = {
  "0":"src/components/images/road.png",
  "1":"src/components/images/skateboard.jpg",
  "2":"src/components/images/smile.png",
  "3":"src/components/images/taco.jpg",
  "4":"src/components/images/tiger.jpg",
  "5":"src/components/images/halfdome.jpg", 
};


const Picture = React.createClass({
  getInitialState () {
    increase();
    console.log(obj2.key);
    return {url:"src/components/images/road.png"};
  },
  componentDidMount(){
    const that = this;
    console.log(that.state);
  	let canvas = ReactDOM.findDOMNode(this);
  	let ctx = canvas.getContext('2d');
    // console.log(canvas);
      let savedImage = new Image();
      //console.log(savedImage);
      if(obj.key<5){
    	  axios.get('api/allBoards')
        .then(function (response) {
        	savedImage.src = response.data[obj.key];
          that.setState({url: picStorage[obj.key]});
          // console.log(that.state.url);
          // console.log(savedImage);
          // console.log(savedImage.src);
          //ctx.drawImage(savedImage,0,0, 200, 200);
           obj.key++;
        })
        .catch(function (response) {
          console.log("error restoring image");
          console.log(response);
        });
        
      } else {
        that.setState({url: picStorage[obj.key]});
      }
  },

  getImageHeight () {
    return Math.round(50 / 2);
  },

  getImageStyle () {
    return {
      top: 0,
      left: 0,
      width: 500,
      height: 500
    };
  },

  getTextStyle () {
    return {
      top: 50,
      left: 0,
      width: 50,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  },

	render(){
    console.log(this.props.url);
    const surfaceWidth = 600;
    const surfaceHeight = 600;
    const imageStyle = this.getImageStyle();
    const textStyle = this.getTextStyle();
    return (
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Imagine style={imageStyle} src={this.state.url}/>
      </Surface>
    )
  }
})

class Gallery extends Component {
  componentDidMount(){
  }

  render () {

    let settings = {
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    }
    return (
      <Slider {...settings} className="gallery">
        <div id = "pic1"><Picture className = "canvasElm" url="src/components/images/halfdome.png"/></div>
        <div id = "pic2"><Picture className = "canvasElm" url="src/components/images/road.png"/></div>
        <div id = "pic3"><Picture className = "canvasElm" url="src/components/images/skateboard.jpg"/></div>
        <div id = "pic4"><Picture className = "canvasElm" url="src/components/images/smile.png"/></div>
        <div id = "pic5"><Picture className = "canvasElm" url="src/components/images/taco.jpg"/></div>
        <div id = "pic6"><Picture className = "canvasElm" url="src/components/images/tiger.jpg"/></div>
      </Slider>
    );
  }
};


module.exports = Gallery;