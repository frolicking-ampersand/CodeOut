import React, {Component} from 'react';

export default class Webcams extends Component {
	constructor(props){
		super(props);
		this.state = {
			wtf: 'wtf'
		}
	}
	componentDidMount() {
	  let that = this;
		let room = location.search && location.search.split('#/')[1];
		let webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: '',
      autoRequestMedia: true,
      debug: false,
      detectSpeakingEvents: true,
      autoAdjustMic: false
		});

    webrtc.on('readyToCall', function () {
      if (room) webrtc.joinRoom('#/webcams');
  	});

  	webrtc.on('channelMessage', function (peer, label, data) {
      if (data.type == 'volume') {
          that.showVolume(document.getElementById('volume_' + peer.id), data.volume);
      }
    });
	  webrtc.on('videoAdded', function (video, peer) {
	  	console.log('are we getting here');
      let remotes = document.getElementById('remotes');
      if (remotes) {
          var d = document.createElement('div');
          d.className = 'videoContainer';
          d.id = 'container_' + webrtc.getDomId(peer);
          d.appendChild(video);
          var vol = document.createElement('div');
          vol.id = 'volume_' + peer.id;
          vol.className = 'volume_bar';
          d.appendChild(vol);
          remotes.appendChild(d);
      }
	  });
	  webrtc.on('videoRemoved', function (video, peer) {
	      console.log('video removed ', peer);
	      let remotes = document.getElementById('remotes');
	      let el = document.getElementById('container_' + webrtc.getDomId(peer));
	      if (remotes && el) {
	          remotes.removeChild(el);
	      }
	  });

	  webrtc.on('volumeChange', function (volume, treshold) {
      that.showVolume(document.getElementById('localVolume'), volume)
	  });

    if (room) {
      that.setRoom(room);
		} else {
	    $('form').submit(function () {

	        var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
	        console.log(val, 'VAL')
	        webrtc.createRoom(val, function (err, name) {
	            console.log(' create room cb', arguments);
	            console.log(location.pathname, 'is')

	            var newUrl = location.pathname + '#/webcams'
	            if (!err) {
	                history.replaceState({foo: 'bar'}, null, newUrl);
	                that.setRoom(name);
	            } else {
	                console.log(err);
	            }
	        });
	        return false;
	    		});
			}
	}

  showVolume(el, volume) {
    if (!el) return;
    if (volume < -45) {
        el.style.height = '0px';
    } else if (volume > -20) {
        el.style.height = '100%';
    } else {
        el.style.height = '' + Math.floor((volume + 100) * 100 / 25 - 220) + '%';
    }
	}

  setRoom(name) {
  	this.setState({
  		wtf: 'wtf'
  	})
	}

	render() {
		return (
			<div>
			  <p id="subTitle"></p>
	      <form id="createRoom">
	          <input id="sessionInput"/>
	          <button type="submit">Create it!</button>
	      </form>
	      <div class="videoContainer">
	          <video id="localVideo" oncontextmenu="return false;"></video>
	          <div id="localVolume" class="volume_bar"></div>
	      </div>
	      <div id="remotes"></div>
      </div>
		)
	}
}
