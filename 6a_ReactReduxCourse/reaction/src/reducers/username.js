import { SET_USER_NAME } from "../actions/types";

const DEFAULT_USERNAME = "Anon";

const usernameReducer = (state = DEFAULT_USERNAME, action) => {
  switch(action.type) {
    case SET_USER_NAME:
      return action.username;
    default:
      return state;
  }
}


export default usernameReducer;
