

//Very basic way to attach an event to a DOM object.
function f1() {
    alert("F1 has fired");
}
function f2() {
    alert("F2 has fired");
}

function f3(event) {
    console.log(event.target.id + "has handled the event for us.");
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
//We have one event handler, but we can click any of the 4 divs inside the parent element.
document.getElementById("p1").addEventListener("click", f3, false);

/*
With capturing, we invert our bubbling - the top-most enclosing dom Element gets to handle our event,
and it trickles down towards the original source, which handles it last. Example Below:
*/

//We get three fires from this, cc2 and parents also handle it.
document.getElementById("p2").addEventListener("click", f3, false);
document.getElementById("cc1").addEventListener("click", f3, false);
document.getElementById("cc2").addEventListener("click", f3, true);




