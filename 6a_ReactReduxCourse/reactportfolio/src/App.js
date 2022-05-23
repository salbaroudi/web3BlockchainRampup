import React, { Component } from 'react';

class RegularClass {}
class ComponentClass extends Component {}

const regularClassInstance = new RegularClass();
const componentClassInstance = new ComponentClass();

console.log(regularClassInstance);
console.log(componentClassInstance);


class App extends Component {
  render() { //defines the HTML elements structure of the Component. This is a static method in Component Class.
      return ( <div>
        <h1> Hello! </h1>
        <p> My name is Bill. I'm a Software Engineer. </p>
        <p> I'm looking forward to learning React.js </p>
        </div> ) //Usage of special JSX
  }
}

export default App; //So that other files can import this app!
