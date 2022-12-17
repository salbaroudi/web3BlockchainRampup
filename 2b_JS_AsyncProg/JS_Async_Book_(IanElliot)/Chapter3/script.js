//For this simple script, we will implement the controller code pattern to manage callbacks in a sequential way.

//Setup Controller - Ad hoc with mutable JS objects.
let controller = {};
controller.queue = [];
controller.add = function(func) {
    controller.queue.push(func)
};

//lets define some non blocking functions, using setTimeout() method:

function longruna(callback) {
    console.log("A");
    setTimeout(callback,2000)
}

function longrunb(callback) {
    console.log("B");
    setTimeout(callback,4000)
}


function longrunc(callback) {
    console.log("C");
    setTimeout(callback,6000)
}

controller.run = function () {
    controller.queue.shift()(controller.run);
}

/*
How does this work?? We add our three longrunX functions to our queue. We call controller.run(),
which pops our first longrunA function off of the queue, and passes ITSELF as a callback into longrunA.
our setTimeout is performed, with controller.run as the function to run. 

This starts longrunb, and the chain continues until all three print statements are written to console.

*/

controller.add(longruna);
controller.add(longrunb);
controller.add(longrunc);
controller.run();