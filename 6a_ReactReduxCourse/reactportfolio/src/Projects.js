import React, { Component } from 'react';
import PROJECTS from './data/projects';

class Projects extends Component {
  render() {
    return (
    <div>
      <h2> Highlighted Projects:: </h2>
      <div>
        {
          PROJECTS.map( proj => {
            return (
              <div key={proj.id}>{proj.title}</div>
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
