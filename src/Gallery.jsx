import React, {Component} from 'react';
import './App.css'
class Gallery extends Component {
  render() {
    const albums = this.props.albums;
    return (
      <div className="gallery-wrapper">
        { albums.map((album, k) => {
            const albumImg = album.image[2]["#text"] !== "" ? album.image[2]["#text"] : this.props.noImg;
            const albumUrl = album.url
            const albumName = album.name;
            if (albumName === "(null)") return console.log(`API Error (Album #${k}): Album no found`);
            return (
              <div key={k} className="album">
                <img src={albumImg} className="album-img" alt="album"/>
                <a target="_blank" href={albumUrl}>{albumName}</a>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Gallery;