import React, { Component } from 'react';
import SOCIAL_PROFILES from '../data/socialProfiles'; //why not .js? Just figures from magic number??

//Make a separate component for each line of data.
class Profile extends Component {
  render() {
    const { link, image } = this.props.profile; //destructuring.

    return (
      <div>
        <a href={link}>
        <img src={image} alt='socialprofile' style={{ display: 'inline', width:35, height:35, margin: 10}}/>
        </a>
      </div>
    )
  }
}


//Our Projects sub-component.
class SocialProfiles extends Component {
  render() {
    return (
    <div>
      <h2> Connect with Me:: </h2>
      <div>
        {
          SOCIAL_PROFILES.map( prof => {
            return (
              <Profile key={prof.id} profile={prof} /> //this must construct a Profile Object, and
            ); //props = property!!
          })
        }
      </div>
    </div>
    )
  }
}

//Once again, we must make it available to other parts of the codebase.
export default SocialProfiles;
