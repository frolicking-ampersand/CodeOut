import React, { Component } from 'react';
import InputColor from 'react-input-color'

export default class BGColorbox extends Component {
  constructor(){
    super(...arguments);
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
      <div className="app animated slideInLeft">
        <span style={texty}>Background:  </span>
        <input
          type="color"
          defaultValue="#345678"
          onChange={this.props.chooseBGParentColor}
        />
      </div>
    );
  }
}