import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile'
import Gallery from './Gallery'

import  './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: null,
      userHint: 'Type name of an Artist'
    }
  }

  handleSearch() {
    const API_KEY = "57ea9a6e7df04883134f88dab0b76f62";
    const BASE_URL = "https://ws.audioscrobbler.com/2.0/?";
    const FETCH_ARTIST_URL = `${BASE_URL}method=artist.getinfo&artist=${this.state.query}&api_key=${API_KEY}&format=json`;
    const FETCH_TRACKS_URL = `${BASE_URL}method=artist.gettoptracks&artist=${this.state.query}&api_key=${API_KEY}&limit=10&format=json`;


    fetch(FETCH_TRACKS_URL, {method: 'GET'})
      .then(response => response.json())
      .then(json => {
            const tracks = json.toptracks.track;
            //console.log('ТРЕКИ', tracks);
            this.setState({tracks});
      })
      .catch(error => this.setState({userHint: 'Wrong artist name'}));


    fetch(FETCH_ARTIST_URL, {method: 'GET'})
      .then(response => response.json())
      .then(json => {
        const artist = json.artist;
        //console.log('АРТИСТ', artist);
        this.setState({artist});
      })
      .catch(error => console.error('Error2:   ', error));


      //console.log('at the end', this.state.artist, this.state.tracks)
  }

  render() {
    return (
      <div className="App">
        <div className = "App-title">Music Application</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type = "text"
              className = "input"
              placeholder = "Search an Artist..."
              value = {this.state.query}
              onChange = {event => this.setState({ query: event.target.value})}
              onKeyPress = {event => event.key==='Enter' ? this.handleSearch() : false } />
            <InputGroup.Addon onClick = {() => this.handleSearch()}>
              <Glyphicon glyph="search"/>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist != null && this.state.tracks != null
          ? <div>
              <Profile
                artist = {this.state.artist}
              />
              <div className = "Gallery">
                <Gallery tracks = {this.state.tracks} />
              </div>
            </div>
          : <div>{this.state.userHint}</div>
        }
      </div>
    );
  }
}

export default App;
