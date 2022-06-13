import React, { Component } from 'react';
import { connect } from 'react-redux';
import { collapseInstructions, expandInstructions } from '../actions/settings';


const Instructions = props => {
  const { instructionsExpanded, expandInstructions, collapseInstructions } = props;

  if (instructionsExpanded) {
    return (
            <div>
              <h3> How to Play:</h3>
              <div> Welcome to Evens or Odds. The game goes like this:</div>
              <div> The deck is shuffled. Then choose: will the next card be even or odd? </div>
              <div> Make a choice on every draw and see how many you get right! (Face cards don't count) </div>
              <br />
              <button onClick={collapseInstructions}> Show less </button>
            </div>
          );
    }

    return (
      <div>
        <h3> Instructions: </h3>
        <p> Welcome to evens or odds. The game goes like this... </p>
        <button onClick={expandInstructions}> Read More </button>
      </div>
    )
  }
//first is a state2props, 2nd is dispatches2props
export default connect(
  state => ({ instructionsExpanded: state.settings.instructionsExpanded }),
{expandInstructions, collapseInstructions}
)(Instructions);
