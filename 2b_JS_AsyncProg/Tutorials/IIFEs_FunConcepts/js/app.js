"use strict";

//In this exercise, we review properties of functions.



//Lets do some tests
//We can clearly call f1 as it is declared.
f1();

//This will fail.
//fun2();

//A functional Declaration. It gets hoisted so we can run it.

function f1() {
  console.log("A Declared function.");
} //don't need a semi-colon for a declaration!

let fun2 = function () {
  console.log("A Function Expression.");
};


//This tryIt function illustrates all usages of a named function:

function tryIt(f) {
  console.log(f);
  f(); //Invoke it!!
}

//A function to try.
function f3() {
  console.log(35);
}

tryIt(f3);

//Lets pass in a function - we can even name it for debugging purposes.
tryIt(function name1() {
  let b = 12;
  console.log("Printing: " + b);
});

//IIFEs
//A function expression that is invoked immediately...
//Used when you need to run a block of code once (on setup), and want local scope.

//How to do this? Put parentheses after the expression!
let product = function() {
  console.log(5*6);
}(); //Like so <---

//Note that we don't store the funciton after immediate invoke - this will fail!
//product();

//Even the variable decleration is redundant, to do a clean IIFE use the following
//syntax:

//Enclose function in parens, and then invoke. So ( <fun> )();

(function() {
  console.log(5*6);
})(); //Like so <---

//Lets tackle Modules Next:
//-----------------------
//A module is a function, in the end. So everything inside is local scope.
//An IIFE module. We access the module with the COMM variable. AFter invoking,
//It runs and returns a reference to the private greeting function.
//Because of htis refernce, a closure has occured and the structure does not
//dissapear.

var COMM = (function () {
  let greet = "Hi", goodbye = "Salut";

  const getGreet = function () {
    let d = new Date();
    if (d.toLocaleTimeString().includes("AM")) {
        greet = "Guten Tag ";
    }
    else {
        greet = "Hihi ";
    }
    return greet;
  }
  const greeting = function (name) {
    let result = getGreet();
    console.log(result + name + "! Welcome to the course.")
  }

  return {
    greetUser: greeting
  };

})();

//Other benefits - local scope and minimal namespace collisions,
//We have also technically implemented private and public functions!
