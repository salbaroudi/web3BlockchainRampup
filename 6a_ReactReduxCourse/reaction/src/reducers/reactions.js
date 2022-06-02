import { REACTION_OBJECTS } from "../actions/types";

const REACTION_TYPES = REACTION_OBJECTS.map(
  REACTION_OBJECT => REACTION_OBJECT.type
);

const DEFAULT_REACTIONS = {
}

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
