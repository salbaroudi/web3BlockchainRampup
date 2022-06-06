import { SET_USER_NAME } from "../actions/types";

//"You aren't lost in all this React code, are you Anon?"
//--> NGMI (╯°□°)╯︵ ┻━┻
const DEFAULT_USERNAME = "Anon";

const usernameReducer = (state = DEFAULT_USERNAME, action) => {
  switch(action.type) {
    case SET_USER_NAME:
      return action.username; //why don't we carry over state?
    default:
      return state;
  }
}


export default usernameReducer;
