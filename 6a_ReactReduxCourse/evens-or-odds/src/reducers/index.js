import { combineReducers } from "redux";
import settingsReducer  from "./settings.js";
import  deckReducer  from "./deck.js";
import gameStateReducer from "./gameState"

export default combineReducers({settings: settingsReducer, deck: deckReducer, gameState: gameStateReducer});
