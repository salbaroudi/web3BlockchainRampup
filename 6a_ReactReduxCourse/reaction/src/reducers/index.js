import { combineReducers } from 'redux';
import messagesReducer from './messages';
import usernameReducer from "./username";
import reactionReducer from "./reactions";


/*Notice that we don't export a rootReducer.
This combines our sub-reducers and returns
A rootReducer function for src/index.js
*/

export default combineReducers({
  messages: messagesReducer,
  username: usernameReducer,
  reactions: reactionReducer
});
