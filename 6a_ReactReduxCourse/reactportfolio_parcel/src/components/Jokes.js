import React, { Component } from "react";

const Joke = ({ joke }) => {
  const {setup, punchline} = joke;
  return <p style={{margin: 20}}> {setup} <em>{punchline}</em> </p>;
}

class Jokes extends Component {
  state = {joke: {}, buttonPressed:false, jokes: []};

  //Fetch is async.
  componentDidMount() {
    fetch("http://localhost:3005/random_joke")
    .then(response => response.json())
    .then(json => this.setState({joke: json}));
    //.then(response => console.log(response.json())); //returns a promise with results inside
    // //our json is just the pointer to response.json() before.
  }

  //For when they click the button!
  fetchJokes = () => {
    //Same remainder code, regardless
    fetch("http://localhost:3005/random_ten")
    .then(response => response.json())
    .then(json => this.setState({jokes:json}));

  }
  render() {
    const {setup, punchline} = this.state.joke;
    return (
      <div>
        <h3> Highlighted Joke:: </h3>
        <Joke joke={this.state.joke}/>
        <br />
        <button onClick={this.fetchJokes}> Get 10 More Jokes!</button>
        {
          this.state.jokes.map(joke => (
          <Joke key={joke.id} joke={joke}/>
        ))
        }
      </div>
    )
  }
}

export default Jokes;
