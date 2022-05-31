import { DECK} from './types'

export const fetchDeckSuccess = deckJson => {
  const { remaining, deck_id} = deckJson;

  return { type: DECK.FETCH_SUCCESS, remaining, deck_id};
}

export const fetchDeckError = error => {
  return { type: DECK.FETCH_ERROR, message: error.message};
}

//return an anon functoin with a dispatch parameter. This is what
//our thunk middleware requires.
export const fetchNewDeck = () => dispatch => {
  return fetch("https://cors-anywhere.herokuapp.com/" + "https://deckofcardsapi.com/api/deck/new/shuffle/", {referrerPolicy:"origin"})
  .then(response => {
    if (response.status !== 200) {
      throw new Error("Unsucessful request to deckofcardsapi.com");
    }
    return response.json()
  })
  .then(json => dispatch(fetchDeckSuccess(json)))
  .catch(error => dispatch(fetchDeckError(error)));
}
