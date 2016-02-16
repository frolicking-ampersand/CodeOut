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
    return (
      <div className="app">
        Tool Color:
        <p>
        <input
          type="color"
          value={this.props.brushColor}
          defaultValue="#345678"
          onChange={this.props.changeParentColor}
        />
        </p>

      </div>
    );
  }
}