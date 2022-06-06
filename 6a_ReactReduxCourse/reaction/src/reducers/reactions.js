import { REACTION_OBJECTS } from "../actions/types";

//Get a filtered mapping of one field of the Objects array.
const REACTION_TYPES = REACTION_OBJECTS.map(
  REACTION_OBJECT => REACTION_OBJECT.type
);

const DEFAULT_REACTIONS = {
}

//Non standard code exhibited in this reducer.
//action refers to our dispatched action object.
//
const reactionReducer = (state = {}, action) => {
  if (REACTION_TYPES.includes(action.type)) {
    const { messageId } = action.item;

    const messageReactions = state[messageId];

    if (messageReactions) {
      return {...state, [messageId]: [...messageReactions, action.item] }
    }

    return { ...state, [messageId]: [action.item] };
  }
  return state;
}

export default reactionReducer;
