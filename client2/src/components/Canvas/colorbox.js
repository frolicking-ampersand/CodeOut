import React, { Component } from 'react';
import InputColor from 'react-input-color'

export default class Colorbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      color: '#3599db'
    }
    this._onChange.bind(this);
    this._onColorChange.bind(this);
  }

  render() {
    return (
      <div className="app">
        <div className="target" style={{width:100,height:100,background:this.state.color}}></div>
        <span>{'color value: ' + this.state.color}</span>
        <br/><br/>
        <input
          type="color"
          value={this.state.color}
          defaultValue="#345678"
          onChange={this._onColorChange.bind(this)}
        />
        <br/><br/>
        <InputColor
          value={this.state.color}
          defaultValue="#345678"
          onChange={this._onChange.bind(this)}
        />
      </div>
    );
  }
  _onChange(color) {
    this.setState({
      color: color
    });
  }

  _onColorChange(e) {
    this.setState({
      color: e.target.value
    });
  }
}