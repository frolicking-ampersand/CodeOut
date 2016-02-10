import React from 'react'


const VideoDetail = ({video}) => {

	if(!video){
		return (
		<img src="./spinner.gif" />
		)
	}

	const videoId = video.id.videoId;
	const url = `https://www.youtube.com/embed/${videoId}`

	return (
		<div className="video-detail col-md-12">
			<div className="embed-responsive embed-responsive-16by9">
				<iframe
				className="embed-responsive-item"
				src={url}>
				</iframe>
			</div>
			<div className="details">
			</div>
		</div>

	);
};

export default VideoDetail;