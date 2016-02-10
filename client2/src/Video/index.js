import _ from 'underscore';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyACCRzAumvvEk2O2lCmS9CZTOVWfCJhaL0';

<<<<<<< d1be1fb3a6624cdc020045232c171d00cc6efa70
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      brushColor: '#000000',
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#FFFFFF'
      },
      clear: false
   };
    this.videoSearch('hack reactor')
  }
  videoSearch(term){
    console.log(this)
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);
  return (
     <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList onVideoSelect={
        selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
     </div>
    )
  }
=======
class Video extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null,
      clear: false
	  };
	  this.videoSearch('Pitch Perfect')
	}
	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			 });
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);
		return (
		 <div>
		 		<div>
		 		<SearchBar onSearchTermChange={videoSearch} />
		 		<VideoList onVideoSelect={
		 		selectedVideo => this.setState({selectedVideo})}
		 		videos={this.state.videos} />
		 		</div>
		 		<div>
				<VideoDetail video={this.state.selectedVideo} />
		 		</div>
		 </div>
		)
	}
>>>>>>> Edit Video
};

export default Video



<<<<<<< d1be1fb3a6624cdc020045232c171d00cc6efa70
ReactDOM.render(<App />, document.querySelector('.container'));
=======
>>>>>>> Edit Video
