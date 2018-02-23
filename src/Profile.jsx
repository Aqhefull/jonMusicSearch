import React, {Component} from 'react';
import { Badge } from "react-bootstrap";
import './App.css'

class Profile extends Component {
  render() {
    let artist = { name: "", listeners: "", image: [{},{},{},{},{}], url: '' };
    if (this.props.artist !== null) {
      artist = this.props.artist;
    }
    const artistImg = artist.image[3]['#text'] !== null ? artist.image[3]['#text'] : this.props.noImg
    return (
      <div className="profile">
        <img alt="Profile" className="profile-img" src={artistImg}/>
        <div className="profile-info">
          <div className="profile-name">{artist.name}</div>
          <div className="profile-listeners"><Badge>{artist.listeners}</Badge> listeners</div>
          <div className="profile-url"><a href={artist.url} target="_blank">Visit Page</a></div>
        </div>
      </div>
    )
  }
}

export default Profile;