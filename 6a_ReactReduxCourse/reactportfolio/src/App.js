import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super(); //you can't extend a class, and not initialize superclass fields.
    this.state = { displayBio: false }; //toggles bio

    this.toggleDisplayBio = this.toggleDisplayBio.bind(this); //must bind methods to access this.
  }


  toggleDisplayBio() {
    this.setState({ displayBio: !this.state.displayBio});
  }

  render() { //defines the HTML elements structure of the Component. This is a static method in Component Class.
      return ( <div>
        <h1> Hello! </h1>
        <p> My name is Bill. I'm a Software Engineer. </p>
        <p> I'm looking forward to learning React.js </p>
        <button onClick={this.toggleDisplayBio}>Show Less</button>
        { this.state.displayBio? (
           <div>
           <p> I live in Colarado. I like cooking, hiking and reading. </p>
           </div>
         ): (
           <div>
              <button onClick={this.toggleDisplayBio}> Read More </button>
           </div>
         )}

        </div> ) //Usage of special JSX
  }
}

export default App; //So that other files can import this app!
