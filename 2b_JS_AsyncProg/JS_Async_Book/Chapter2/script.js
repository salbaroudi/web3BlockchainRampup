//Our basic event handlers.
function f1() {
    alert("F1 has fired");
}
function f2() {
    alert("F2 has fired");
}

function f3(e) {
    console.log(e.target.id + "has handled the event for us.");
}

button1 = document.getElementById("b1");
button1.onclick=f1;

//Another method, and its removal. Note the third param is the Capture option (anti-bubbling)
button1.addEventListener("click", f2, false);

//Remove the event
//button1.removeEventListener("click", f2, false);

/*Event bubbling is a default JS behaviour for DOM events - if a UI interaction occurs with a DOM 
element, JS first looks for an Event Handler attached to the dom element. If found, it executes the 
handler. The event then bubbles up the parent chain, and can be handled by parent handlers for 
further side effects.
*/

//Here we have one event handler, but we can click any of the 4 divs inside the parent element.
document.getElementById("p1").addEventListener("click", f3, false);

/*
With capturing, we invert our bubbling - the top-most enclosing dom Element gets to handle our event,
and it trickles down towards the original source, which handles it last. Example Below:
*/

//We get three fires from this, cc2 and parents also handle it.
document.getElementById("p2").addEventListener("click", f3, false);
document.getElementById("cc1").addEventListener("click", f3, false);
document.getElementById("cc2").addEventListener("click", f3, true);

//Next let us create and demonstrate Custom Events:
cbutton1 = document.getElementById("cb1");
cbutton2 = document.getElementById("cb2");
let ourEvent = new Event("ourEvent", { bubbles:false, cancelable: true});
let ourCustomEvent = new CustomEvent("ourCustomEvent", {
    detail: { field1:1, 
        field2:"test"},
    bubbles:false
    });

cbutton1.addEventListener("ourEvent", function(e) { console.log("ourEvent");});
cbutton2.addEventListener("ourCustomEvent", function(e) {
    console.log("ourCustomEvent");
    console.log("Field 1: " + e.detail.field1);
    console.log("Field 2: " + e.detail.field2);
});

//Notice that we dispatch our custom events on the DOM object that has the correct handlers registered.
console.log("Dispatching Custom Events...");
cbutton1.dispatchEvent(ourEvent);
cbutton2.dispatchEvent(ourCustomEvent);

//Finally, let us demonstrate that we do not need DOM objects to dispatch Events off of. We can have an Event Target,
//That has no DOM object associated to it, instead.
//See: https://stackoverflow.com/questions/15308371/custom-events-model-without-using-dom-events-in-javascript
let target = new EventTarget();
target.addEventListener('noDOMTargetEvent', function(e) { 
    console.log("We fired and handled an event with no DOM target");});
target.dispatchEvent(new Event('noDOMTargetEvent'));

//Custom Events don't behave like Asynchronous Events. They behave like
//Synchronous Functions
console.log("Custom Event Demonstration (Synchronous) ");

let event2 = new Event("myEvent2", {bubbles:false, cancelable:true});
target.addEventListener("myEvent2", function(e) { console.log("ME2 called");});


//You might think that "After" occurs before Event2, but this does not
//happen. Event2 is dealt with immediately after dispatchEvent is called,
//The current (global) set of instructions are not run to completion,
//like what would happen. So this means our dispatch event was dealt
//with asynchronously.
console.log("Global Context Demonstration:------");
console.log("Before");
target.dispatchEvent(event2);
console.log("After")


console.log("Function Context Demonstration:------");
//We see in a function, our current script statements are not run to 
//completion either - our dispatchEvent was dealt with synchronously.
function callOnTarget(target, event2) {
console.log("Before");
target.dispatchEvent(event2);
console.log("After");
}
callOnTarget(target, event2);


//Compare this to an actual event dispatch
//Should be asynchronous
//Result: Our current set of statements (in global script) are handled first.
console.log("Comparison (Asynch Events)----------");
let event3 = new Event("asyncEvent");
button3 = document.getElementById("async1");
button3.addEventListener("asyncEvent", function(e) { console.log("Our Async Event");});
console.log("Before");
setTimeout(function() {
    button3.dispatchEvent(event3);
},0);
console.log("After");
