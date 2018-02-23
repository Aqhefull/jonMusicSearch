import React, { Component } from 'react';
import './App.css';
import { 
  FormGroup, 
  FormControl, 
  InputGroup, 
  Glyphicon,
  Grid, 
  Row, 
  Col
} from 'react-bootstrap';
import Profile from './Profile'
import Gallery from "./Gallery"
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      albums: [],
      noImg: 'https://pbs.twimg.com/profile_images/570238398288261120/UUI283GI_400x400.png'
    }
  }

  search() {
    const API_KEY = '28d609ee44d8660a8c50b91393633944';
    const BASE_URL = 'https://ws.audioscrobbler.com/2.0/?method=';
    const BASE_SEACRH = 'artist.search';
    const BASE_ALBUMS = 'artist.gettopalbums';
    let FETCH_URL = `${BASE_URL}${BASE_SEACRH}&artist=${this.state.query}&api_key=${API_KEY}&format=json`;
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.results.artistmatches.artist[0];
      this.setState({artist});
      FETCH_URL = `${BASE_URL}${BASE_ALBUMS}&artist=${this.state.query}&api_key=${API_KEY}&format=json`;
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        const albums = json.topalbums.album;
        this.setState({albums})
      })
    })

  }
  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <div className="App-title">jonMusicSearch</div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <div className="App-main-search-input">
                <FormGroup>
                  <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Search for an Artist"
                      value={this.state.query}
                      onChange={event => {this.setState( { query: event.target.value } )}}
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          this.search()
                        }
                      }}
                    />
                    <InputGroup.Addon onClick={() => this.search()}>
                      <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              </div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={3}>
              {
                this.state.artist !== null
                ? <div>
                    <Profile
                      artist={this.state.artist}
                      noImg={this.state.noImg}
                    />
                  </div>
                : <div></div>
              }
            </Col>
            <Col xs={12} md={9}>
              {
                this.state.artist !== null
                ? <div>
                    <Gallery
                      albums={this.state.albums}
                      noImg={this.state.noImg}
                    />
                  </div>
                : <div></div>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App;