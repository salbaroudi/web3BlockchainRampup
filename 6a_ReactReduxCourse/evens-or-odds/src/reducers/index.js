import { combineReducers } from "redux";
import settingsReducer  from "./settings.js";
import  deckReducer  from "./deck.js";
import gameStateReducer from "./gameState"

//Will return a composite reducer with the name RootReducer, for ./src/index.js
export default combineReducers({settings: settingsReducer, deck: deckReducer, gameState: gameStateReducer});
