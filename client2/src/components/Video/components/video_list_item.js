import React from 'react';

export default ({video, onVideoSelect}) => {
	const imageUrl = video.snippet.thumbnails.default.url;
	const divStyle = {
	  'backgroundColor': 'black',
	  'borderRadius': '0px',
	  'borderWidth': '.5px 0px .5px 0px',
	  'borderColor': 'black',
	  'borderStyle': 'solid',
	};
	return (
	 <li style={divStyle} className="list-group-item" onClick={() => onVideoSelect(video)}>
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