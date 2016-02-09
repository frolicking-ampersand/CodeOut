//<canvas className="canvasPic"></canvas>
//"src/components/images/road.png"
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slider from 'react-slick';
import ReactCanvas from 'react-canvas';
import CanvasDraw from './canvasdraw';
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

const Painting = React.createClass({
  // getInitialState(){
  //   return {
  //     url:this.props.url,
  //     name: "cow"
  //   }
  // },
  componentDidMount(){
    let canvas = ReactDOM.findDOMNode(this);
    var that = this;
    let context = canvas.getContext("2d");
    //console.log("the context is", context);
    let savedImage = new Image();
    savedImage.src=this.props.url;
    console.log("the imageId is",this.props.imgId)
    context.drawImage(savedImage,0,0,300,150);
    // axios.get('api/lastBoard')
    //   .then(function (response) {
    //     console.log("response data ",response.data);
    //     savedImage.src = response.data;
    //     //console.log(savedImage);
    //     context.drawImage(savedImage,0,0,300,150);
    //     //that.setState(name:"pig")

    //   })
    //   .catch(function (response) {
    //     console.log("error restoring image");
    //     console.log(response);
    //   });
  },
  render(){
    //let thisEasy = ReactDOM.findDOMNode(this);
    //console.log(thisEasy);
    const divStyle = {
      'border-style': 'solid',
      'border-width': '5px 5px 5px 5px',
      'border-color': 'black',
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
  componentDidMount(){

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
    //console.log("the target is",target);
  }

  render () {

    let settings = {
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    }
    let x=0;
    let commentNodes = this.props.data.map(function(where) {
      return (
        <div className="box"><Picture className="canvasElm" url={where.img}/></div>
      );
    });

    let paintingCollection = this.props.data.map(function(where){
      console.log("the painting id is ",where.id)
      //always pass a key!!!
      return (
        <div><Painting className="paintingCollection" key={where.id} url={where.img} imgId={where.id}/></div>
      );
    });

    //console.log("these are the comment nodes=======",commentNodes);
    let road = <div>HAPPY</div>
    return (
      <Slider {...settings} className="gallery">
        {paintingCollection}
        </Slider>
    );
  }
};


module.exports = Gallery;