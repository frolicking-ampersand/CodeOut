import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import ReactCanvas from 'react-canvas';
import CanvasDraw from './canvasdraw';
const Surface = ReactCanvas.Surface;
const Imagine = ReactCanvas.Image;
const Text = ReactCanvas.Text;
const Painting = React.createClass({

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this);
    var that = this;
    let context = canvas.getContext("2d");
    let savedImage = new Image();
    savedImage.src=this.props.url;
    context.drawImage(savedImage,0,0,300,150);
  },
  render(){
    const divStyle = {
      'border-style': 'solid',
      'border-width': '5px 5px 5px 5px',
      'border-color': 'black',
      'background-color': 'white',
    }
    return (
      <canvas style={divStyle} id ={this.props.id}></canvas>
    )
  }
})

const Picture = React.createClass({
  getInitialState () {
    return {url:"src/components/images/road.png"};
  },

  getImageStyle () {
    return {
      top: 0,
      left: 0,
      width: 350,
      height: 300
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
  constructor (props){
    super(props);

    this.state = {
      data: this.props.data,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data:nextProps.data
    })
  }

  componentDidMount(){
    let target = document.getElementById('snap');
  }

  render () {

    let settings = {
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    }
    let x=0;


    let paintingCollection = this.props.data.map(function(where){
      //always pass a key!!!
      return (
        <div><Painting className="paintingCollection" key={where.id} url={where.img} imgId={where.id}/></div>
      );
    });

    return (
      <Slider {...settings} className="gallery">
        {paintingCollection}
        </Slider>
    );
  }
};


module.exports = Gallery;