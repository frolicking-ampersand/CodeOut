import React, {Component} from 'react';

class Webcams extends Component {
	constructor(props){
		super(props)
	}
	componentDidMount() {

	let webrtc = new SimpleWebRTC({
	  localVideoEl: 'localVideo',
	  remoteVideosEl: 'remotesVideos',
	  autoRequestMedia: true,
	  audio: true
	});

		webrtc.on('readyToCall', function () {
		  webrtc.joinRoom(window.roomName);
		});
	}

	render() {
		return (
			<div>
        <video height="150" id="localVideo"></video>
        <div className="webcams" id="remotesVideos"></div>
      </div>
		)
	}
}

export default Webcams