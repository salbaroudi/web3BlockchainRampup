import React from 'react';
import { connect } from 'react-redux';

const correctGuessesRecordKey = "CORRECT_GUESSES_RECORD_asdfwoyheu";

const checkRecord = correctGuesses => {
    const record = Number(localStorage.getItem(correctGuessesRecordKey));

    if (correctGuesses > record) {
      localStorage.setItem(correctGuessesRecordKey, correctGuesses);

      return { record: correctGuesses, isNewRecord: true };
    }

    return { record, isNewRecord: false };
};

const GameState = ({ remaining, correctGuesses }) => {
  const guessText = correctGuesses === 1 ? "guess" : "guesses";

  const { record, isNewRecord } = checkRecord(correctGuesses);

  const recordLabel = isNewRecord ? "NEW RECORD!!" : "Record";

  return (
    <div>
      <p> {remaining} cards remaining. </p>
      <p> {correctGuesses} correct {guessText} </p>
      <h3> {recordLabel}: {record} </h3>
    </div>
  );
}

export default connect(
  ({
    deck: {remaining},
    gameState: {correctGuesses}
  }) => ({ remaining, correctGuesses })
)(GameState);
