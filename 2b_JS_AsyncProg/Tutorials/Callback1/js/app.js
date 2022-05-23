//Example 1
//Wait 3 seconds and then execute logCall
let logCall = function() {
    console.log("locCall was called back.");
};

setTimeout(logCall, 3000);

//Example 2
//Standard Notation: using an anonymous function.
setTimeout(function() {
    console.log("The function was called back 2");
}, 3000);

//Example 3

let btn = document.querySelector("#item1");

btn.addEventListener("click", function(e) {
    console.log("The button was clicked.");
});
