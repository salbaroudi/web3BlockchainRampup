"use strict";

//Setting up a generator has two code parts:
/*1) Setting up a function to do the work of the geneator.
2) Usage of the "yield" keyword.

* operator indicates to JS that this is a Generator.
After doing this, we get no console.log statements! Generator is waiting!

To run the generator, use the next() method on the gen object.

Its return value will be wrapped in an object, that indicates status "done",
in addition to the return value.

The yield keyword allows us to exit the generator, and then re-enter at that
specific point when we call .next again.

If you call yield with no return value - it will return a status object.
If you return a value with yield, the status object will contain the value.

Are generators a subset of iterators??



*/

function *genTest() {
    let x = 0;
    console.log('start');
    yield ++x;
    console.log(x);
    x++;
    console.log(x);
    yield ++x;
    console.log('end');
    return x;
};


let gen = genTest();

//Lets make a generator with a function expresssion.
//Note: You cannot use an arrow function, currently with JS.
const test = function *() {
  yield 10;
  yield 20;
  yield 30;
}

let it = test();
//Notice that this console statement will run before we even yield anything;
//Generators do not hold up code that is placed after them!
console.log("After Code.")
