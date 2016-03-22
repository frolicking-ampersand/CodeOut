import React, { Component } from 'react';
import InputColor from 'react-input-color'

export default class Colorbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      color: this.props.color
    }
  }

  render() {
  const texty = {
      'color': 'white',
      'marginRight': '5px',
      'width': '150px'
  };
    return (
      <div className="app">
        <span style={texty}>Tool Color:  </span>
        <input
          type="color"
          value={this.props.brushColor}
          defaultValue="#345678"
          onChange={this.props.changeParentColor}
        />
      </div>
    );
  }
}