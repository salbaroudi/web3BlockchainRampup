"use strict";

//Modify the code by creating a promise so that the code can run asynchronously.

//Notice the promise is placed here.
//Here, we returned a new promise with setTimeOut embedded into it,
//for an asynchronous result.
const massiveProcess = function(num) {
    return new Promise(function(resolve, reject) {
        if (isNaN(num)) {
            reject("Please enter a number!");
        } else {
            let result = 0;
            setTimeout(function() {
                for (let i = num ** 7; i >= 0; i--) {
                    result += Math.atan(i) * Math.tan(i);
                };
                //We don't touch resolve until the loop is done! Thats why it works
                resolve(result); //we don't hit this until the for is done.
            }, 0);
        }
    });
};
//Remember: We can make things async by using setTimeout( --, 0). If we put
//Our resolve print out inside this code, we will get this behaviour.

massiveProcess(10)
    .then(function(amt) {
        console.log("The number is: " + amt);
    })
    .catch(function(msg) {
        console.error(msg);
    });



//More processing later on
console.log(5 * 5 + 100);
