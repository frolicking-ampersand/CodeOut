import React, { Component } from 'react';
import Webcams from './webcams'
const Menu = require('../react-burger-menu').stack;

export default class Webcambar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: 'main'
    };
  }

  render () {
  	return (
    <div>
      <Menu customIcon={'./media/webcam.svg'} right isOpen>
        <Webcams />
       </Menu>
    </div>
  	)
  }
}

