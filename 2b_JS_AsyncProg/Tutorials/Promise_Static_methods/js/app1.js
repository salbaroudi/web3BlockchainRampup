"use strict";


let firstName = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Steven");
        }, 4000);
    });
};

let lastName = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("Hancock");
        }, 3000);
    });
};

let midName = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("W.");
        }, 7000);
    });
};

//Our functions RETURN a promise, so they need to be invoked.
//We return an array, that is the resolve print out of each promise.
Promise.all([firstName(), lastName(), midName()])
.then(function(msg) {
  console.log(msg[0] + " " + msg[1] + " " + msg[2]);
})
.catch(function(msg) {
  console.log("ERROR" + msg);
});


//With Promise.race, only the first to return is returned - everythign else ignored.
Promise.race([firstName(), lastName(), midName()])
.then(function(msg) {
  console.log(msg);
})
.catch(function(msg) {
  console.log("ERROR" + msg);
});
