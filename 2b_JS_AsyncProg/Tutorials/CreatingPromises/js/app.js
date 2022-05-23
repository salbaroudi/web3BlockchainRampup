"use strict";

//Takes in a callback function, that expects two other functions as arguments.
let a = new Promise(function(resolve,reject) {
  setTimeout(function() { //we decide how to use the resolve and reject not autohandled like errors.
    reject("Done");
  }, 4000)
});

console.log(a);

//How do we use the promise? with the THEN() method.
//The THEN() function passes the two functions into our callback,
//above. It does this when an event occurs.
a.then(function(val) {
  console.log(val);
},function(val) {
  console.log("rejected" + val);
});

//Conclusion: The THEN method allows us to act on a promise!

//HOw do we create a function, with a promise?
//Just return the promise that you would construct
