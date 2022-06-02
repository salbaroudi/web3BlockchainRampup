import React from "react";
import { connect } from 'react-redux';
import { setUsername } from "../actions/setusername";

const SetUsername = ({ setUsername }) => {
  return (
    <div>
      <h3>Username</h3>
      <input onChange={event => setUsername(event.target.value)} />
    </div>
  )
}

export default connect(null, { setUsername })(SetUsername);
