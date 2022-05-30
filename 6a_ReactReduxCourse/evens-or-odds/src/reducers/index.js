import {SET_GAME_STARTED,
  SET_INSTRUCTIONS_EXPANDED,
  FETCH_DECK_RESULT
} from "../actions/types.js";

const DEFAULT_SETTINGS = {
  gameStarted: false,
  instructionsExpanded: false
}
const rootReducer = (state = DEFAULT_SETTINGS, action) => {
  //console.log("red State:", state);
  //console.log("red Action:", action);

  switch(action.type) { //note: because we return in every case, we dont need a break statement!
    case SET_GAME_STARTED:
      return {
        gameStarted: action.gameStarted,
        instructionsExpanded:state.instructionsExpanded
      }; //Note the shorthand JSX for JSON notation.
    case SET_INSTRUCTIONS_EXPANDED: //shorthand: use the spread operator on state to maintain its values.
      return { ...state, instructionsExpanded:action.instructionsExpanded };
    case FETCH_DECK_RESULT:
      const { remaining, deck_id } = action;
      return {...state, remaining, deck_id};
    default:
      return state;
  }
}

export default rootReducer;
