"use strict";

//First notice, that if we run the vanilla, code, the code runs synchronously.
//The async keyword on its own does not make code asynchronous. It indicates
//to JS that some async code will be present, and allows us to invoke await
//in a function.

//Keep in mind however, that an async predicated function will return a promise.

async function num1() {
    console.log(1);
    return 1;
};

//It is the setTO function that made this run asynchronously, not the keyword.
async function num1b() {
    setTimeout(() => console.log(1),0);
    return 1;
};


async function num2() {
    console.log(2);
    return 2;
};

async function main() {
    console.log("Start Main");
    num1b();
    num2();
    console.log("End Main");
    return "main";
};

main().then(val => console.log(val));

console.log("Last Line");
