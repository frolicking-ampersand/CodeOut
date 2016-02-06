import React, { Component } from 'react';
import Webcams from './webcams'
const Menu = require('./../../react-burger-menu').stack;

class Webcambar extends Component {
  constructor(props) {
    super(props);
  }
  render () {
  	return (
    <div>
      <Menu customIcon={'./images/webcam.svg'} right>
        <Webcams />
       </Menu>
    </div>
  	)
  }
}

export default Webcambar