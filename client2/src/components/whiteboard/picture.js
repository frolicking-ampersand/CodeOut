import React from 'react';
import ReactCanvas from 'react-canvas';
const Surface = ReactCanvas.Surface;
const Imagine = ReactCanvas.Image;

const Picture = React.createClass({
  getInitialState () {
    return {url:"src/components/images/road.png"};
  },

  render(){
    const surfaceWidth = 300,
          surfaceHeight = 300,
          ImageStyle = {
            'top': '0px',
            'left': '0px',
            'width': '350px',
            'height': '300px'
          };

    return (
      <Surface width={surfaceWidth}
               height={surfaceHeight}
               left={0}
               top={0}>
        <Imagine style={imageStyle}
               src={this.props.url}
        />
      </Surface>
    )
  }
})