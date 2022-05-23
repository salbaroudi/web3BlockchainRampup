"use strict";
/*
const test = function() {
    setTimeout(function() {
        console.log("Start of code");

        alert("Notice Me!");

        console.log("End of code");
    }, 10);
};

const test2 = function() {
    console.log("Now I get attention.");
};

test();
test2();
*/

//This is from the supplimentary links tutorial:
//We demonstrate that JavaScript can't be asynchronous on its own core functionality
function functionOne(num) {
  console.log(num);
}

function functionTwo(num, callback) {
  let callbackNum = 10;
  callback(callbackNum);
  console.log(num);
}

//Lets see the order of printing.
// 5 does not print first! callback() put on Message Queue, but stack is empty so it gets called first.
functionTwo(5, functionOne); //outputs 10, then 5 on a new line


//Example 2: To get JS to perform asynchronously, we used setTimeOut();
console.log("Hello");
const takesALongTime = () => console.log("I am the takesALongTime function.");
// Function that takes 1 hour to run
setTimeout(takesALongTime, 0); //in milliseconds.
console.log("Bye"); //Here we see the last statement beat out the takesALongTime function.
