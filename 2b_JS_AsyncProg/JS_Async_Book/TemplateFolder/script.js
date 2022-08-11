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

