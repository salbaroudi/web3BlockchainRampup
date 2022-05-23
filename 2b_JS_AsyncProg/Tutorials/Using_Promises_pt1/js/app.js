"use strict";

/*let wordnikWords = "http://api.wordnik.com/v4/words.json/",
    wordnikWord = "http://api.wordnik.com/v4/word.json/",
    apiKey = "?api_key=XXX",
    wordObj;*/

//Lets experiment with promises, and respond to there values using the .then() function:

/*
let asyncFunction = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("asyncFunction has resolved.");
        }, 4000);
    });
};
*/
let p1 = asyncFunction(); //This returns a Promise Object, with a value inside (resolved).

//This is also a promise!
//Even if we don't return asynch, we will still get a promise back
let p2 = p1.then(function(val) { //This is a callback, we call it when our promise returns a result.
  console.log("Promise: " + val);
  return asyncFunction2();
});

//To get the result of asynch2, we call the then method again on p2
p2.then(function(val) {
  console.log("Second Promise:" + val);
});

console.log("The code is Asynchronous.");

//Lets make this cleaner, with functional chaining. Skip all the assignments.
asyncFunction()
.then(function(val) {
  console.log("Promise 3: " + val);
  return asyncFunction2(); //To continue the promise chain, we call another promise.
})
.then(function(val) { //Here, we are passing in the resolve function
  console.log("Promise 4:" + val);
});
