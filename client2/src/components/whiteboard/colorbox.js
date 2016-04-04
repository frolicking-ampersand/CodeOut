import React, { Component } from 'react';
import InputColor from 'react-input-color'

export default (props) => {
  const texty = {
    'color': 'white',
    'marginRight': '5px',
    'width': '150px'
  };

  return (
    <div className="app animated slideInLeft">
      <span style={texty}>Tool:  </span>
      <input
        type="color"
        value={props.brushColor}
        defaultValue="#345678"
        onChange={props.changeParentColor}
      />
    </div>
  )
}