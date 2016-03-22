import React, { Component } from 'react';
import Slider from 'react-slick';
import Painting from './painting';


export default class Gallery extends Component {
  constructor (){
    super(...arguments);
    this.state = {
      data: this.props.data,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      data:nextProps.data
    })
  }

  componentDidMount(){
    let target = document.getElementById('snap');
  }

  render () {
    let settings = {
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 10000
    }

    let paintingCollection = this.props.data.map(function(where){
      return (
        <div>
          <Painting
              className="paintingCollection"
              key={where.id}
              url={where.img}
              imgId={where.id}
          />
          </div>
      );
    });

    return (
      <Slider {...settings} className="gallery">
        {paintingCollection}
      </Slider>
    );
  }
};
