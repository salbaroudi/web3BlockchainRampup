import React from 'react';
import PROJECTS from '../data/projects';

//NOtice that props is passed directly - no .this reference.
//Note that this does not extend the Component class => so it can't use this.state.
//Only components that are stateless can use Functional syntax like this.
const Project = props => {

  const { title, image, description, link } = props.project;

  return ( //style: two braces. One to declare the style, the other to declare the object.
    <div style={{}}>
      <h3> {title} </h3>
      <img src={image} alt='profile' />
      <p>{description}</p>
      <a href={link}>{link}</a>
    </div>
  )
}

//Notice that this omits the render(return()) methods. We just return JSX directly in short-hand notation.
const Projects = () => (
    <div>
      <h2> Highlighted Projects:: </h2>
      <div>
        {
          PROJECTS.map( proj => ( //again, dump return() and use JSX if simple enough code.
              <Project key={proj.id} project={proj} />
            ))
        }
      </div>
    </div>
    )

//Once again, we must make it available to other parts of the codebase.
export default Projects;
