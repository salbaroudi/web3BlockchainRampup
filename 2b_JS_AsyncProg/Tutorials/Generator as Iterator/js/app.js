"use strict";

let arr = ['a', 'b', 'c', 'd'];

//Iterator setup (directly)
let it = arr[Symbol.iterator]();

//Making an interator with Generators:
const arrIt = function *(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  };
};

//This will run until our array runs out.
//So these are like finite geneators, as the defining array can't be infinite.
let it2 = arrIt(arr);

//Interact directly.
console.log(it2.next().done);
console.log(it2.next().value);

console.log("Remaining Code.");
