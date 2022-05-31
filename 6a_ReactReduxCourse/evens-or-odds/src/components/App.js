import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, cancelGame } from '../actions/settings';
import { fetchNewDeck } from "../actions/deck";
import Instructions from "./Instructions";
import fetchStates from "../reducers/fetchStates";


class App extends Component {
  startGame = () => { //we must init the deck - but we also query the API separately later.
    this.props.startGame();
    this.props.fetchNewDeck();
  }
  render() {
    console.log("App THIS::", this);

    if (this.props.fetchState === fetchStates.error) {
      return (
        <div>
          <p> Please try reloading the app. An error occured. </p>
          <p> {this.props.message} </p>
        </div>
      )
    }

    return (
      <div>
      <h2>&diams; &clubs; Evens or Odds &hearts; &spades;</h2>
      {
        this.props.gameStarted ? (
          <div>
            <h3> The game is on! </h3>
            <br />
            <button onClick={this.props.cancelGame}> Cancel Game </button>
          </div>
        ): (
          <div>
            <h3> A new game awaits </h3>
            <br />
            <button onClick={this.startGame}> Start Game </button>
            <Instructions />
          </div>
        )
      }
      </div>
    );

  }
}

//Used to customize our component connectors.
//we filter our state, so components have access to specific fields
//public/private.
const mapStateToProps = state => {
  console.log("state", state);
  //shorthand notation for setting key:value pairs.
  const {gameStarted, fetchState, message} = state;
  return {gameStarted, fetchState, message};
}

/*
const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(startGame()), //note IIFE invocation of action method.
    cancelGame: () => dispatch(cancelGame()),
    fetchNewDeck: () => fetchNewDeck(dispatch) //non-standard way.
  };
} */

//const componentConnector = connect(mapStateToProps);
const componentConnector = connect(mapStateToProps, {
startGame,
cancelGame,
fetchNewDeck
});

export default componentConnector(App);
