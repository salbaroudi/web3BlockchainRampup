import React, { Component } from 'react';

const Entry = props => {

  const { name, img } = props.plEntry;

  return (
    <div className="img-contain">
      <img src={img} alt="Video Image" className="vid-img" />
      <p><b>{name}</b></p>
    </div>
  )
}

const FirstPlaylist = ({ playListing }) => {
  if (!playListing) { return(<div> No First Playlist found!</div>); }
  return (
      <div>
        <h3> First Playlist Entries:: </h3>
        <div>
          {
            playListing.map( elem => (
                <Entry key={elem._id} plEntry={elem} />
              ))
          }
        </div>
      </div>
      )
}
//Once again, we must make it available to other parts of the codebase.
export default FirstPlaylist;
