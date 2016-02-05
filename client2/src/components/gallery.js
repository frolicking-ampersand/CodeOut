import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slider from 'react-slick';
const obj = {key:0};
const Picture = React.createClass({
  componentDidMount(){
  	  let canvas = ReactDOM.findDOMNode(this);
  	  console.log(canvas + "============");
  	  let ctx = canvas.getContext('2d');
      let savedImage = new Image();
  	  axios.get('api/allBoards')
      .then(function (response) {
      	savedImage.src = response.data[obj.key];
        console.log(response.data[obj.key]);
        ctx.drawImage(savedImage,0,0, 200, 200);
        obj.key++;
      })
      .catch(function (response) {
        console.log("error restoring image");
        console.log(response);
      });
  },

	render(){
		return (
      <canvas className="canvasPic"></canvas>
		)
	}
})

class Gallery extends Component {
	componentDidMount(){
    console.log(document.getElementById("pic2"));
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
        <div ><Picture className = "canvasElm"/></div>
        <div id = "pic2"><Picture className = "canvasElm" id="stuff3"/></div>
        <div id = "pic3"><Picture className = "canvasElm"/></div>
        <div id = "pic4"><Picture className = "canvasElm"/></div>
        <div id = "pic5"><Picture className = "canvasElm"/></div>
      </Slider>
    );
  }
};



module.exports = Gallery;