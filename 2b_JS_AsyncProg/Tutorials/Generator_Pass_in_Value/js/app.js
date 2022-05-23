"use strict";

//The yield keyword does not just pass values out of a generator, but also
//into a generator.

function *yieldConsole() {
  let val = yield "Enter a Value:"; //This will pull from the console.
  console.log(val);
};


//Set our generator iterable
let it = yieldConsole();
//We call the geneator with .next(), and save the value yielded("Enter a Value").
let prompt = it.next().value;
console.log(prompt); //we Print what was given by yield ("Enter a Value")
