import React from "react";
import { connect } from 'react-redux';
import { setUsername } from "../actions/setusername";
//We just import the setUsername action directly, and call it.


const SetUsername = ({ setUsername }) => {
  return (
    <div>
      <h3>Username</h3>
      <input onChange={event => setUsername(event.target.value)} />
    </div>
  )
}

//Here, we have no props from connect, but we do set a dispatch.
export default connect(null, { setUsername })(SetUsername);
