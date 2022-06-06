import React, {Component} from 'react';
import { connect } from 'react-redux';
import { PubSubContext } from "../pubsub";
import { createReaction } from "../actions/reactions";
import { REACTION_OBJECTS } from '../actions/types';

class CreateReaction extends Component {
  /*Note we return a function, not the render().
  This is so our onclick functoin doesn't invoke() immedately when it is loaded during doc parsing.
  Note that we have two items in Props that were loaded via different routes:
  -username was loaded via the connect method below
  -messageId was loaded the local way via the Instance Tag in MessageBoard.js
  */

  publishReaction = ({ type, emoji}) => () => {
    const { username, messageId } = this.props;
    //This broadcasts to the channel, so others may read it. Also calls the action generator function.
    this.context.pubsub.publish(createReaction({type, emoji, username,messageId }));
  }
  //OnClick: We don't want it called right away, so return a function, not an IIFE inline.
  render() {
    return (
      <div>
        {
          REACTION_OBJECTS.map(REACTION_OBJECT => {
            const {type, emoji} = REACTION_OBJECT;
            return <span style={{margin: 5, cursor: "pointer"}} key={type}
            onClick={this.publishReaction({ type, emoji})}>{emoji}</span>
          })
        }
      </div>
    )
  }
  static contextType = PubSubContext;
}


export default connect(({ username }) => ({username}))(CreateReaction);
