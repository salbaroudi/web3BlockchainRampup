import React, { Component } from 'react';
import PROJECTS from './data/projects';

//Make a separate component for each line of data.
class Project extends Component {
  render() {
    console.log("props::",this.props); //props is available in the this obj, just like state.
    //project comes from the mapping below. App below is the parent and assigns proj object to project attribute in <Project tag>
    const { title, image, description, link } = this.props.project;

    return ( //style: two braces. One to declare the style, the other to declare the object.
      <div style={{}}>
        <h3> {title} </h3>
        <img src={image} alt='profile' />
        <p>{description}</p>
        <a href={link}>{link}</a>
      </div>

    )
  }
}


//Our Projects sub-component.
class Projects extends Component {
  render() {
    return (
    <div>
      <h2> Highlighted Projects:: </h2>
      <div>
        {
          PROJECTS.map( proj => {
            return ( //React uses the keys. project attribute takes the individual entry conencted
              //to the key.
              <Project key={proj.id} project={proj} />
            );
          })
        }
      </div>
    </div>
    )
  }
}

//Once again, we must make it available to other parts of the codebase.
export default Projects;
