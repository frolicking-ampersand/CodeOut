import React, { Component } from 'react';
import Youtube from 'react-youtube';

export default class VideoDetail extends Component {
	constructor(props){
		super(props)
		this.state={
			player: null
		}
		this.setPlayer = this.setPlayer.bind(this);
		this.sendPlayData = this.sendPlayData.bind(this);
		this.playVideo = this.playVideo.bind(this);
		this.sendPauseData = this.sendPauseData.bind(this);
		this.pauseVideo = this.pauseVideo.bind(this);
	}

	componentDidMount() {
		this.socket = io();
		this.socket.on('playVideo', function (data) {
      this.setState({term: data.term});
    }.bind(this));
		this.socket.on('recievePlay', this.playVideo);
		this.socket.on('recievePause', this.pauseVideo);
  }

  setPlayer(event) {
  	this.setState({
      player: event.target,
    });
  }

  sendPlayData() {
  	this.socket.emit('sendPlay');
  }

  playVideo(){
  	this.state.player.playVideo();
  }

  sendPauseData() {
  	this.socket.emit('sendPause');
  }

  pauseVideo () {
  	this.state.player.pauseVideo();
  }

	render() {
		if(!this.props.video){
			return (
			<img className="centerMe" src="./spinner.gif" />
			)
		}

		return (
			<div className="video-detail col-md-12">
				<div className="embed-responsive embed-responsive-16by9">
					<Youtube
					videoId={this.props.video.id.videoId}
					onReady={this.setPlayer}
					onPlay={this.sendPlayData}
					onPause={this.sendPauseData}
					/>
				</div>

			</div>
		);
		}
};

export default VideoDetail;