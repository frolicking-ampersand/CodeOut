import _ from 'underscore';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import Navbar from '../code_editor_navbar';
import Webcams from '../webcam-bar'

const API_KEY = 'AIzaSyACCRzAumvvEk2O2lCmS9CZTOVWfCJhaL0';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
<<<<<<< 668e1d4156d5759b1e6c7b25636a3b9346f114be:client2/src/Video/index.js
      selectedVideo: null,
      brushColor: '#000000',
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#FFFFFF'
      },
      clear: false
   };
    this.videoSearch('hack reactor')
=======
      selectedVideo: null
    };
    this.videoSearch('college football')
>>>>>>> Add to video functionality:client2/src/components/Video/index.js
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
<<<<<<< 668e1d4156d5759b1e6c7b25636a3b9346f114be:client2/src/Video/index.js
  return (
=======
    return (
>>>>>>> Add to video functionality:client2/src/components/Video/index.js
     <div>
        <Webcams />
        <Navbar />
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoList onVideoSelect={
        selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
        <VideoDetail video={this.state.selectedVideo} />
     </div>
    )
  }
}

export default Video



