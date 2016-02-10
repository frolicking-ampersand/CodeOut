import React from 'react';
import VideoListItem from './video_list_item';
import Slider from 'react-slick'

const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return (
					<VideoListItem
						onVideoSelect={props.onVideoSelect}
						key={video.etag}
						video={video} />
		)
	})

  let settings = {
      dots: true,
      infinite: false,
      speed: 500,
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
		<Slider {...settings}>
		    <div>{videoItems[0]}</div>
		    <div>{videoItems[1]}</div>
		    <div>{videoItems[2]}</div>
		    <div>{videoItems[3]}</div>
		    <div>{videoItems[4]}</div>
     </Slider>

	);
};

export default VideoList;

