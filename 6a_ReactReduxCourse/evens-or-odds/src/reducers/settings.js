import {SET_GAME_STARTED, SET_INSTRUCTIONS_EXPANDED } from "../actions/types.js";


const DEFAULT_SETTINGS = {
  gameStarted: false,
  instructionsExpanded: false
}

const settingsReducer = (state = DEFAULT_SETTINGS, action) => {
  switch(action.type) { //note: because we return in every case, we dont need a break statement!
    case SET_GAME_STARTED:
      return { ...state, gameStarted: action.gameStarted };
    case SET_INSTRUCTIONS_EXPANDED: //shorthand: use the spread operator on state to maintain its values.
      return { ...state, instructionsExpanded:action.instructionsExpanded };
    default:
      return state;
  }
};

export default settingsReducer;
