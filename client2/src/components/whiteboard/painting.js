import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class Painting extends Component {

  componentDidMount () {
    let canvas = ReactDOM.findDOMNode(this);
    let context = canvas.getContext("2d");
    let savedImage = new Image();
    savedImage.src=this.props.url;
    context.drawImage(savedImage,0,0,300,150);
  }

  render(){
    const divStyle = {
      'borderStyle': 'solid',
      'borderWidth': '0.5px 0.5px 0.5px 0.5px',
      'borderColor': 'black',
      'backgroundColor': 'white',
    }
    return (
      <canvas style={divStyle} id ={this.props.id}></canvas>
    )
  }
}