import { FETCH_DECK_RESULT} from './types'

export const fetchDeckResult = deckJson => {
  const { remaining, deck_id} = deckJson;

  return { type: FETCH_DECK_RESULT, remaining, deck_id};
}

export const fetchNewDeck = dispatch => {
  return fetch("https://cors-anywhere.herokuapp.com/" + "https://deckofcardsapi.com/api/deck/new/shuffle", {referrerPolicy:"origin"})
  .then(response => response.json())
  .then(json => fetchDeckResult(json))
  .catch(error => console.log("Error::",error));
}
