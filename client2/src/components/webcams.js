import React, {Component} from 'react';

export default class Webcams extends Component {
	constructor(props){
		super(props)
	}
	componentDidMount() {
	  let webrtc = new SimpleWebRTC({
	  localVideoEl: 'localVideo',
	  remoteVideosEl: 'remotesVideos',
	  autoRequestMedia: true
		});

	  webrtc.on('readyToCall', function () {
  	webrtc.joinRoom('whiteboard');
		});
	}

	render() {
		return (
			<div>
        <video height="150px" id="localVideo"></video>
        <div className="webcams" id="remotesVideos"></div>
      </div>
		)
	}
}
