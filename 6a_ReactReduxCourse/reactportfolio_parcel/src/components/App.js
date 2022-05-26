import React, { Component } from 'react';
import Projects from './Projects.js';
import SocialProfiles from './SocialProfiles.js';
import profile from '../assets/profile.png';
import Title from "./Title";
class App extends Component {

  //Notice that we don't bother to initialize the component fields.
  //auto-constructed with default values that we won't use, (likely).
  state = { displayBio: false };

/*
  constructor() {
    super(); //you can't extend a class, and not initialize superclass fields.
    this.state = { displayBio: false }; //toggles bio

    this.toggleDisplayBio = this.toggleDisplayBio.bind(this); //must bind methods to access this.
  }
*/

  toggleDisplayBio = () =>  {
    this.setState({ displayBio: !this.state.displayBio});
  }
//cant use class attribute - reserved word in React.
  render() { //defines the HTML elements structure of the Component. This is a static method in Component Class.
      return ( <div>
        <img src={profile} alt="profile" className='profile' />
        <h1> Hello! </h1>
        <p> My name is Bill. </p>
        { this.state.displayBio ? <Title />: null }
        <p> I'm looking forward to learning React.js </p>

        { this.state.displayBio? (
           <div>
           <p> I live in Colarado. I like cooking, hiking and reading. </p>
           <button onClick={this.toggleDisplayBio}>Show Less</button>
           </div>
         ): (
           <div>
              <button onClick={this.toggleDisplayBio}> Read More </button>
           </div>
         )}
         <hr />
         <Projects />
        <hr />
          <SocialProfiles /> //containers should have capitalized names.
        </div>
        ) //Usage of special JSX
  }
}

export default App; //So that other files can import this app!
