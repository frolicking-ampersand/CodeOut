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
      <div className="app">
        <span style={texty}>Background Color:  </span>

        <input
          type="color"
          value={this.props.backgroundColor}
          defaultValue="#345678"
          onChange={this.props.chooseBGParentColor}
        />
      </div>
    );
  }
}