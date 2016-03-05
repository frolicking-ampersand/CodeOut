import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
	const imageUrl = video.snippet.thumbnails.default.url;

	const divStyle = {
	  'backgroundColor': 'black',
	  'borderRadius': '0px',
	  'borderWidth': '.5px 0px .5px 0px',
	  'borderColor': 'black',
	  'borderStyle': 'solid',
	};
	return (
	 <li style={divStyle} onClick={() => onVideoSelect(video)} className="list-group-item">
		<div>
			<div className="media-left">
				<img className="media-object" src={imageUrl} />
			</div>
			<div className="media-body">
				<div className="media-heading" >{video.snippet.title}</div>
			</div>
		</div>
	 </li>
	);
};

export default VideoListItem;