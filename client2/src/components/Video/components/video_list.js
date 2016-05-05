import React from 'react';
import VideoListItem from './video_list_item';
import Slider from 'react-slick'

export default (props) => {
	const videoItems = props.videos.map((video) => {
		return (
					<VideoListItem
						onVideoSelect={props.onVideoSelect}
						key={video.etag}
						video={video} />
		)
	})

  const settings = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 10000,
      speed: 1000,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [{
          breakpoint: 1024,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
          }
      }, {
          breakpoint: 600,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2
          }
      }, {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
      }]
  };

	return (
		<Slider {...settings} className="animated slideInDown">
		    <div>{videoItems[0]}</div>
		    <div>{videoItems[1]}</div>
		    <div>{videoItems[2]}</div>
		    <div>{videoItems[3]}</div>
		    <div>{videoItems[4]}</div>
        <div>{videoItems[0]}</div>
        <div>{videoItems[1]}</div>
        <div>{videoItems[2]}</div>
     </Slider>
	);
};