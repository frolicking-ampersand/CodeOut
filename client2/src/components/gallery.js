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
    return {url:"src/components/images/road.png"};
  },
  componentDidMount(){
    
  },

  getImageStyle () {
    return {
      top: 0,
      left: 0,
      width: 200,
      height: 200
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
    //console.log(this.props.url);
    const surfaceWidth = 300;
    const surfaceHeight = 300;
    const imageStyle = this.getImageStyle();
    const textStyle = this.getTextStyle();
    return (
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Imagine style={imageStyle} src={this.props.url}/>
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
      slidesToScroll: 3
    }

    let commentNodes = this.props.data.map(function(where) {
      return (
        <div className="box"><Picture className = "canvasElm" url={where}/></div>
      );
    });
    console.log("these are the comment nodes=======",commentNodes);

    return (
      <div>
      <Slider {...settings} className="gallery">
        {commentNodes}
      </Slider>
      </div>
    );
  }
};


module.exports = Gallery;