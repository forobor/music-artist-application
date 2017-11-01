import React, { Component } from 'react'
import './Gallery.css'


class Gallery extends Component {
  handleOnClick(url){
    document.location.href = url;
  }
  render() {
    const tracks = this.props.tracks
    return (
      <div className = "Gallery">
        {
          tracks.map((track, key) =>{
            return(
              <div key={key} className="track" onClick={()=>this.handleOnClick(track.url)}>
                <p className="track-text track-name">{track.name}</p>
                <p className="track-text">{track.listeners} listenings</p>
              </div>
            )
          })}
      </div>
    );
  }
}

export default Gallery;
