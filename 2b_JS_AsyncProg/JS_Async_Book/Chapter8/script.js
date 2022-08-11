//Let's start with a simple example of a web-worker.

//Exploring the order of execution for tasks and microtasks:

setTimeout(function () {
    console.log("Task1");
},0);

Promise.resolve().then(function () {
    console.log("MicroTask1")
})

setTimeout(function () {
    console.log("Task2");
},0);

Promise.resolve().then(function () {
    console.log("MicroTask2")
})

//Example: Promises are a native way to dispatch microtasks. Microtasks must be cleared out before we start teh next Task or UI Task. As we can easily
//stall the ui (with the loop) - Chrome places a limit (of 100) microtasks at a time. See console for details.

setTimeout( function () {
    console.log("Task");
},0);

var p=Promise.resolve();
for (i=0; i<1000; i++) {
    p.then(function () {
        console.log("Microtask");
    });
}

