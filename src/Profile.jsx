import React, { Component } from 'react';

import  './Profile.css';

class Profile extends Component {
  render() {
    let artist = {
                  name: '',
                  stats: { listeners: ''},
                  image: [[],[],{"#text": ''}],
                  tags: {
                    tag: [{name:''}]
                  }
                };

    artist = this.props.artist !== null
            && this.props.artist.error !== 'underfined'
            ? this.props.artist
            : artist;

    return (
      <div className = "Profile">
      {
        artist.image[2][`#text`] !== '' &&
          <img
              className="profile-img"
              src={artist.image[2][`#text`]}
              alt={artist.name}
          />
        }

        <div className = "profile-info">
          <div className="profile-name">{artist.name}</div>
          <div className="profile-listeners">{artist.stats.listeners} listeners</div>
          <div className="profile-tags">
            {
              artist.tags.tag.map((tag, key) => {
                tag =
                  tag !== artist.tags.tag[artist.tags.tag.length - 1]
                  ? ` ${tag.name},`
                  : ` ${tag.name}`
                return(<span key={key}>{tag}</span>)
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
