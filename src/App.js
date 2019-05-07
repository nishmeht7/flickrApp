import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos:[],
      value: ""
    }
  }

  onChangeHandler = (e) => {
    let word = e.target.value;
    console.log("the word is: ", word);
    this.setState({value: word});
    if(word.length == 0) {
      this.setState({photos: []})
    }
    else {
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&text=${word}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
        let photos = json.photos.photo;
        photos.forEach(photo => {
          let url = `http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
          let allUrls = [url].concat(this.state.photos);
          this.setState(prevState => ({
            photos: allUrls
          }))
        })
      })
    }
  }

  onSuggestionClick = word => {
      this.setState({value: word});
  }

  render() {
    const { value, photos } = this.state;
    return (
      <div className="bodyWrapper">
        <form>
          <input className="input" type="text" placeholder="image search" onChange={this.onChangeHandler} value={value} />
          <span className="imageViewerWrapper">
          <div className="imageViewer">
            {photos.map(url => {
              return url != null ?
              <img width="200" height="200" className="image" src={url} />
              :
              null;
            }
            )}
          </div>
          </span>
        </form>
      </div>
    );
  }
}

export default App;
