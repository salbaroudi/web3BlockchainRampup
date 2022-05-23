"use strict";


let asyncFunction = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve("asyncFunction has resolved.");
        }, 4000);
    });
};

//I modified this to test the resolve/reject functions.
let asyncFunction2 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            let randX = Math.random()
            if (randX < 0.01) {
              resolve("asyncFunction2 is done.");
            } else { //This throws an exception.
              reject("asyncFunction2 is not done.");
            }
        }, 3000);
    });
};
