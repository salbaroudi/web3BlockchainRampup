import React, { Component } from "react";
import { connect } from 'react-redux';
import { PubSubContext } from "../pubsub";
import { newMessage } from "../actions/messages";

class PublishMessage extends Component {
  state = { text: ""}; //local component state

  //events come from interactions below.
  updateText = event => this.setState({ text: event.target.value});

  //state is local, props username access specified by connect() below.
  publishMessage = () => {
    const { text } = this.state;
    const { username } = this.props;

    //we wrapped pubsub context around App in src/index.js.
    this.context.pubsub.publish(newMessage( { text, username }));
  }

  handleKeyPress = event => {
    if (event.key === "Enter") { this.publishMessage();}
  }

  render() {
    console.log("this", this)
    return (
      <div>
        <h3>Got something to say?</h3>
        <input onChange={this.updateText} onKeyPress={this.handleKeyPress} />
        {" "}
        <button onClick={this.publishMessage}> Publish It! </button>
      </div>
    )
  }

  static contextType = PubSubContext;
}

//We have connected to Store, and specified we read username - this is mapped to Props.
//No Dispatch map has been specified
export default connect(({ username }) => ({ username }))(PublishMessage);
