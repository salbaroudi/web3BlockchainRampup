//This is our default JS file, that links things together.

import React from 'react'; //core library
import ReactDOM from "react-dom"; //allow us to insert our app into the DOM tree
import App from './App';


//We just use JSX tags with the App's name, to render it in the DOM tree.
ReactDOM.render(<App />, document.getElementById("root"));
//We use a self-enclosing tag, as our App has no child dependencies.

class Animal {
  constructor(name,age) {
    this.name=name;
    this.age=age;
  }

  speak() {
    console.log("I am", this.name, "and I am", this.age, "years old.");
  }
}

//This will print out to inspector console.
const animal1 = new Animal("Simba", 3);
animal1.speak();

class Lion extends Animal {
  constructor(name,age,furColor, speed) {
      super(name, age);
      this.furColor = furColor;
      this.speed = speed;
  }
  roar() {
    console.log("Roar! I have " , this.furColor, " colored fur.");
  }
}

const lion1 = new Lion("Mufasa", 20, "gold");
const lion2 = new Lion("Scar", 19, "brown");

lion1.roar();
lion2.roar();
