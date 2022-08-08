//Lets start with a simple example of a Web Worker. Load WW1.js


let button1 = document.getElementById("button1");

let result1 = document.getElementById("result1");
let count1 = document.getElementById("count1");

button1.addEventListener("click", function (event) {
        //User can spawn an arbitrary number of Workers - restrict it.
        button1.setAttribute("disabled",true);
        var worker = new Worker("./ww1.js");
        //Worker obj has EL attached - will process results.
        worker.addEventListener("message", function (event) {
            result1.innerHTML=event.data.pi;
            count1.innerHTML=event.data.k;
            button1.setAttribute("disabled",false);
        });
});

//Now lets make ww2.js asynchronous.
let button2 = document.getElementById("button2");
let result2 = document.getElementById("result2");
let count2 = document.getElementById("count2");

//Let us create the worker thread, and drive it.

button2.addEventListener("click", function () {
    var worker = new Worker("./ww2.js");
    worker.addEventListener("message", function (event) {
            result2.innerHTML=event.data.value;
    });

    //Drive it:
    worker.postMessage("start");
    setInterval(function() {
        worker.postMessage("update")
    },200);
});