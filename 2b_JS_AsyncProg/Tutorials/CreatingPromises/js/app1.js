"use strict";

let asyncFunction = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("asyncFunction has resolved.");
        }, 4000);
    });
};

let asyncFunction2 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("asyncFunction2 is done.");
        }, 3000);
    });
};

//Here we are illustrating a coding pattern, that converts callback functions
//To promises.

let setTimeoutP = function(time) {
  return new Promise(function(res,rej) {
    if (isNaN(time)) {
      rej("A non-negative number is required.")
    }
    setTimeout(res, time);
  });
};

setTimeoutP("asdfasd")
.then(function() {
  console.log("Done!");
}, function(msg) {
  console.log(msg);
})
.catch(function(err) { //Note that our reject method overrides the error.
  console.error(err);
});

/*The Pattern:

Let the body of our function be placed in the RES() function.

let funPromise = function(args) {
  return new Promise(function (res, rej) {
    if (TESTS/TIMEOUT LOGIC) {
      rej("Some error message")
    }
    setTimeout(res, timeperiod)
    })
}

funPromise(<response body callback>, <reject body callback>)


*/
