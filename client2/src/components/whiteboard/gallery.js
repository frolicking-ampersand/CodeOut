import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Slider from 'react-slick';
import ReactCanvas from 'react-canvas';
const Surface = ReactCanvas.Surface;
const Imagine = ReactCanvas.Image;
const Painting = React.createClass({

  componentDidMount() {
    let canvas = ReactDOM.findDOMNode(this);
    let context = canvas.getContext("2d");
    let savedImage = new Image();
    savedImage.src=this.props.url;
    context.drawImage(savedImage,0,0,300,150);
  },

  render(){
    const divStyle = {
      'borderStyle': 'solid',
      'borderWidth': '5px 5px 5px 5px',
      'borderColor': 'black',
      'backgroundColor': 'white',
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


  render(){
    const surfaceWidth = 300;
    const surfaceHeight = 300;
    const ImageStyle = {
      'top': '0px',
      'left': '0px',
      'width': '350px',
      'height': '300px'
    }

    return (
      <Surface width={surfaceWidth}
               height={surfaceHeight}
               left={0}
               top={0}>
        <Image style={imageStyle}
               src={this.props.url}
        />
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
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 10000
    }
    let x=0;


    let paintingCollection = this.props.data.map(function(where){
      return (
        <div>
          <Painting
              className="paintingCollection"
              key={where.id}
              url={where.img}
              imgId={where.id}
          />
          </div>
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