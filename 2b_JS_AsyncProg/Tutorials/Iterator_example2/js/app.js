"use strict";

let arr = ['a', 'b', 'c', 'd'];

//Is this pointing to a generator function? Why does this work?
let it = arr[Symbol.iterator]();

//Can Iterate
let domDiv = document.querySelectorAll("div");

//Can iterate
let str = "a_string";

//Cannot iterate natively. We can use a generator however.
let obj = {
  1: "one",
  2: "two",
  3: "three"
};

//Adding an iterator:

obj[Symbol.Iterator] = function*() {
  for (let i = 1; i < 4; i++){
    yield this[i];
  }
};

//We can use a for - of loop of these objects.

for (let v of str) {
  console.log(v);
}

let it2 = obj[Symbol.Iterator]();
