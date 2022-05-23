"use strict";

//First, add the setTimeout code as shown in the intro
//to this exercise. Then modify the code by creating a
//promise so that the code can run asynchronously.

//So this failed. I treid to use previous template code to form a solution,
//This code is not asynchronous at all. Why?

//I used this as our Reponse function
const massiveProcess = function(num) {
    let result = 0;
    setTimeout(function() { //We need this to make our local code async!
        for (let i = num ** 7; i >= 0; i--) {
            result += Math.atan(i) * Math.tan(i);
        };

        //I did not put the print out code here. It works, but the code
        //is ugly and extraneous.
        console.log("The number is: " + result)
        return result;
    }, 0);

};

//I set up a wrapper promise, that takes in our massiveProcess as our repsonse
//callback.
let mp_Promise = function(num) {
  return new Promise(function(res,rej) {
    if (!isNaN(num)) {
      res(num); //Notice that there is nothing asynchronous here.
    } else {
      rej(num);
    }
  });
};

//let amt = 0; // massiveProcess(10);
mp_Promise(10) //You have made the response function async, not the promise body!
.then(massiveProcess, function(val) { console.log(val + " Is not a number.")})
.then(result => console.log("The number is: " + result));
//It looks like the then() function does not block asynchronously.
//This is why our return statement prints as "undefined".
//Code executed before we could calculate a result.



//The work for this needs to be done in a THEN() statement. Lets do it.
//console.log("The number is: " + amt);

//More processing later on
console.log(5 * 5 + 100);
