// import _ from 'underscore';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import YTSearch from 'youtube-api-search';
// import SearchBar from './components/search_bar';
// import VideoList from './components/video_list';
// import VideoDetail from './components/video_detail';
import DrawableCanvas from 'react-drawable-canvas';
// const API_KEY = 'AIzaSyACCRzAumvvEk2O2lCmS9CZTOVWfCJhaL0';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// videos: [],
			// selectedVideo: null,
			brushColor: '#000000',
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#FFFFFF'
      },
      clear: false
	  };
	  // this.videoSearch('hack reactor')
	}
	// videoSearch(term){
	// 	console.log(this)
	// 	YTSearch({key: API_KEY, term: term}, (videos) => {
	// 		this.setState({
	// 			videos: videos,
	// 			selectedVideo: videos[0]
	// 		 });
	// 	});
	// }

	handleOnClickClear()  {
    this.setState({
      clear: true
    });
  }
  handleOnClickChangeColorYellow() {
    this.setState({
      brushColor: '#FFFF00',
      clear: false
    });
  }
  handleOnClickChangeColorBlack() {
  	console.log(this);
    this.setState({
      brushColor: '#000000',
      clear: false
    });
  }
  handleOnClickChangBgToRed() {
    let newstate = this.state;
    newstate.canvasStyle.backgroundColor = '#FF0000';
    newstate.clear = false;
    this.setState({
      newstate
    });
  }
  handleOnClickChangBgToBlue() {
    let newstate = this.state;
    newstate.canvasStyle.backgroundColor = '#00FFDC';
    newstate.clear = false;
    this.setState({
      newstate
    });
  }


	render() {
		// const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

		return (
		 // <div>
		 		// <SearchBar onSearchTermChange={videoSearch} />
		 		// <VideoDetail video={this.state.selectedVideo} />
		 		// <VideoList onVideoSelect={
		 		// selectedVideo => this.setState({selectedVideo})}
		 		// videos={this.state.videos} />


		 		<div className='canvas-state' style={{height: '500px'}}>
	        <p>Frolicking Ampersands</p>
        <div className='button-bar'>
          <button onClick={ this.handleOnClickClear.bind(this) }>Clear</button>
          <button onClick={ this.handleOnClickChangeColorYellow.bind(this) }>Yellow</button>
          <button onClick={ this.handleOnClickChangeColorBlack.bind(this) }>Black</button>
          <button onClick={ this.handleOnClickChangBgToRed.bind(this) }>Change Background to Red</button>
          <button onClick={ this.handleOnClickChangBgToBlue.bind(this) }>Change background to Blue</button>
        </div>
        <DrawableCanvas {...this.state}/>
        </div>
		 // </div>
		)
	}
};


ReactDOM.render(<App />, document.querySelector('.container'));