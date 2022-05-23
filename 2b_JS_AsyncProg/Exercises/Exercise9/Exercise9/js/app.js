
/*
Using the random number code below,
set up a generator function that will act as a producer of a random value.
It should return a random number whenever next is invoked.
Set the function up so it can be used to create a random number between 1 and 100
or 1 and 10 or between 1 and any number; basically the end number should be whatever
is passed into the function.

Body of Code:
Math.floor(Math.random() * end) + 1;



*/

//Default value coded, incase we forget to set the function up.
const randGen = function *(end = 1) {
  while (true) {
    yield Math.floor(Math.random() * end) + 1;
  }
};

//Test instances. Run .next() on each.
let myGen5 = randGen(5);

let myGen10 = randGen(10);

let myGen1000 = randGen(1000);
