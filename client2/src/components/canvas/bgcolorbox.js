import React, { Component } from 'react';
import InputColor from 'react-input-color'

export default class BGColorbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      color: this.props.color
    }
  }

  render() {
    return (
      <div className="app">
        Background Color:
        <p>
        <input
          type="color"
          value={this.props.backgroundColor}
          defaultValue="#345678"
          onChange={this.props.chooseBGParentColor}
        />
        </p>

      </div>
    );
  }
}