import React  from 'react';
import SOCIAL_PROFILES from '../data/socialProfiles'; //why not .js? Just figures from magic number??


const Profile = props => {
    const { link, image } = props.profile; //destructuring.

    return (
      <div>
        <a href={link}>
        <img src={image} alt='socialprofile' style={{ display: 'inline', width:35, height:35, margin: 10}}/>
        </a>
      </div>
    )
  }

const SocialProfiles = () => (
  <div>
    <h2> Connect with Me:: </h2>
    <div>
      {
        SOCIAL_PROFILES.map( prof => (
            <Profile key={prof.id} profile={prof} /> //this must construct a Profile Object, and
          ) //props = property!!
        )
      }
    </div>
  </div>
)


//Once again, we must make it available to other parts of the codebase.
export default SocialProfiles;
