import React, { Component } from 'react';

const Post = props => {

  const { text } = props.postObj;

  return (
    <div className="posttext">
      <p>{text}</p>
    </div>
  )
}

const RecentUserPosts = ({ userPosts }) => {
  if (!userPosts) {return(<div> No First Playlist found!</div>);}
  return (
      <div>
        <h3> Recent User Posts:: </h3>
        <div>
          {
            userPosts.map( post => (
                <Post key={post._id} postObj={post} />
              ))
          }
        </div>
      </div>
      )
}
//Once again, we must make it available to other parts of the codebase.
export default RecentUserPosts;
