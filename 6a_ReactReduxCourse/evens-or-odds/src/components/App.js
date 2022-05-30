import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, cancelGame } from '../actions/settings';
import { fetchDeckResult, fetchNewDeck } from "../actions/deck";
import Instructions from "./Instructions";


class App extends Component {
  startGame = () => { //we must init the deck - but we also query the API separately later.
    this.props.startGame();
    this.props.fetchNewDeck();
  }
  render() {
    console.log("App THIS::", this);
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

  return {gameStarted: state.gameStarted};
}

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => dispatch(startGame()),
    cancelGame: () => dispatch(cancelGame()),
    fetchNewDeck: () => fetchNewDeck(dispatch)
  };
}

//const componentConnector = connect(mapStateToProps);
const componentConnector = connect(mapStateToProps,mapDispatchToProps);

export default componentConnector(App);
