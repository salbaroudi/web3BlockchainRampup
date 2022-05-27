import React, { Component } from 'react';
import RecentUserPosts from './RecentUserPosts';
import FirstPlaylist from './FirstPlaylist';

//Cant put this in class - will not compile!
const API_ADDR = "https://cors-anywhere.herokuapp.com/https://openwhyd.org/";

class App extends Component {

  state = {userQuery: '', playlistArr: [], userPosts: []};

  updateUserQuery = event => {
    this.setState({userQuery: event.target.value});
  }

  searchUser = () => {
    //first see if user exists:
    fetch(API_ADDR + this.state.userQuery + "?format=json&limit=4")
    .then(response => response.json())
    .then(json => {
    (!json.hasOwnProperty("error"))?this.setState({userPosts:json}):alert("Invalid Username. Try again!");
    }).catch(error => console.log("Error:", error.message));

    //need origin policy for CORS proxy or we get a rejected promise.
    fetch(API_ADDR + this.state.userQuery + "/playlist/1?format=json&limit=25" ,{referrerPolicy:"origin"})
    .then(response => response.json())
    .then(json => { this.setState({playlistArr: json}); })
    .catch(error => console.log("Error:", error.message));

  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.searchUser();
    }
  }

  render() {
      console.log(this.state);
      return ( <div>
        <h2> OpenWhyd User + Playlist Query </h2>
        <p> Type in a valid user name from OpenWhyd, and this App will get their latest 5 posts, and tracks from their first playlist! </p>
        <input onChange={this.updateUserQuery} onKeyPress={this.handleKeyPress} placeholder="Search for a User" />
        <button onClick={this.searchUser}>Search</button>
        <hr />
          <RecentUserPosts userPosts={this.state.userPosts} />
        <hr />
          <FirstPlaylist playListing={this.state.playlistArr} />
        </div>)
    }
}

export default App;
