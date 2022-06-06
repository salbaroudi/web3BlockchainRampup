//Store long string state names as types. Good coding practice.
import { NEW_MESSAGE } from "../actions/types";

const DEFAULT_MESSAGES = { items: [] };

/*reducer. Note the default state structure in case
we are calling from an init state.
*/

const messageReducer = (state = DEFAULT_MESSAGES, action) => {
  switch(action.type) {
    case NEW_MESSAGE: //return whatever state we had before, and append.
      return {...state, items: [...state.items, action.item] };
    default:
      return state;
  }
}

//Must be exported and recombined in reducers/index.js
export default messageReducer;
