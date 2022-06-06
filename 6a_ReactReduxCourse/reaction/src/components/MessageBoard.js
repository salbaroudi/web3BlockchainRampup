import React from "react";
import { connect } from 'react-redux';
import CreateReaction from './CreateReaction';

//Stateless subcomponent that displays the reactions we received.
const MessageReactions = ({ messageReactions }) => {
  if (!messageReactions) return null;

  return (
    messageReactions.map((reaction, index) => {
      const {id, emoji, username} = reaction;

      return (
        <span key={id}>
          <em>{username}:</em> {" "}
          {emoji}
          {index !== messageReactions.length -1? ", ": null}
        </span>
      )
    })
  )
}
//Stateless component that displays all messages we have so far.
const MessageBoard = ({ messages, reactions }) => {
  return (
    <div>
      {
        messages.items.map(messageItem => {

        const { id, text, timestamp, username } = messageItem;

        return (
          <div key={id}>
          <h4> {new Date(timestamp).toLocaleString()}</h4>
          <p>{text}</p>
          <h4>-{username}</h4>
          <CreateReaction messageId={id} />
          <MessageReactions messageReactions={reactions[id]} />
          <hr />
          </div>
        )
        })
      }
    </div>
  )
}

//First arg is MapStateToProps
export default connect(
({messages,reactions}) => ({messages,reactions}))(MessageBoard);
