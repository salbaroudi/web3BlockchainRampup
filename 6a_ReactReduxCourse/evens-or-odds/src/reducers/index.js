import { combineReducers } from "redux";
import settingsReducer  from "./settings.js";
import  deckReducer  from "./deck.js";

export default combineReducers({settings: settingsReducer, deck: deckReducer});
