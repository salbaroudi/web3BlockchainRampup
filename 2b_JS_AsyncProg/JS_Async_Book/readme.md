## Purpose:

This addendum sub-folder exists to do practice exercies from the book *"JavaScirpt Async: Events, Callbacks, Promises and Async/Await"* by Ian Elliot.
To be honest, even after doing a Udemy course on these topics, I still feel a bit shaky at times on these concepts. Some additional re-inforcement is required.

Summary notes will be posted below per chapter. Coding exercises are also organized by chapter:

### Chapter 1:
- goto caniuse.com to check if a particular JS feature is implemented by modern browsers. 

### Chapter 2: Custom and Standard Events:
- Note: The terminology used below is purely conceptual - not canon or standard in modern JS refernces. It is simply to highlight the underlying workings of JavaScirpt, it a practical way for someone to grasp what is going on, under-the-hood.
- A running JavaScript instance is essentially single-threaded - this thread is the UI Thread. Its main responsibility is to monitor, set and execute events.
- A JS program is essentially a colleciton of event handlers, with the rest of the code kept in a global level. There is no default "main" function like C/Java. 
- When events are not being dispatched, focus shifts to the Global level where scripts live.
- An event in JavaScript is any user-interaction, or pre-programmed occurance that occurs at run time.
- Events themselves are natively defined and created in the HTML DOM - a code model of the HTML elements on the page. When a user interacts with a DOM object, an event is "fired".
- Events are codified as objects. There is an **Event Dispatch Queue** where they are placed. The UI thread regularly checks to see if there are any events lined up - and works to clear them out quickly.
- By "clearing", we mean that an event is matched to event-handler(s) that have been pre-defined to handle the event. These store functions, that use the event and perform side-effects in our program environment. All event-handlers and their associated functions **run to completion. They cannot be interrupted.**
- Note: When an event is fired, the current code in the function/global context is run to completion, before the EventHandler Queue is dealt with.
The *event here is dealt with Asynchronously*, by default.
- **General Rule:** A script level or functional body will run to completion. It is important not to have event-handlers, or global scripts that are too long - or our UI / event handling will lag noticably.
- The "ideal" JS scirpt is one where the event queue is as empty as possible. If the queue gets overloaded with too many events, UI responsiveness will suffer. Being mindful of event timing and congestion is a major design issue for all larger JS applications.
- Parts of an Event:
    1) Event Name
    2) Additional data or Properties.
- Parts of an Event Listener Registration: 
    1) Event Name (to match to) 
    2) Handler Function (to pass event to, and execute)
    3) DOM Object or Target Reference (where the event will be generated from)

#### Event Handler Registration:

- Basic Event Handling is set with HTML properties, with the familiar on<Event> handlers:

```
<div onclick="eventhandlername">

```

- Using core JS, we can add and remove event handlers with the following code. Note that removeEventListener can remove events that were added by addEventListener - it **may not** do it with other methods.

```
//Define named function f1(), f2()... and object button1

document.getElementById("idname").onclick=functionname

removeEventListener("click",f1,false)

button1.addEventListener("click",f2,false);
```

- Multiple events (even the same type of event), can be added to DOM elements with no restriction. Order of execution is **not guarenteed**, however.

- Custom events can also be defined by the user. These are emitted by code at Run-Time, or by other functions. See Code Examples for details on how to do this.


- We can also genreate custom (non-DOM) targets, to attach our event-handlers to. This is done as follows:

```
const target = new EventTarget();
...
```

- The code examples for custom events utilize the *target.dispatchEvent(e)* function. Note that this behaves *synchronously*. The event will be dealt with immediately, and is not put in the usual Event Queue to be Asynchronously handled.

- So events sent by dispatchEvent() are effectively synchronous. How do we make them asynchronous? Use the **setTimeout()** function. For example:

```
//some code before
setTimeout(function() { //some statements },timee)
//some code after

```
When set time out is called, our function is put on the event dispatch queue, and a timer is set. When the timer reaches zero, the function is run. Note that this behaviour is a bit different from queuing an emitted event, and matching with the registered event-handler. 

- Another way we can get asynchronous behaviour is with the **postMessage()** function. This has an advantage over setTimeOut(), as even with a delay of 0 - there can be 10s of milliseconds before the event is actually queued. 
- Generally: the setTimeOut() method allows us to dispatch upto 200 events/s. With Post Message, this is increased by a factor of 100.
- Some example of other asynchronous calls (with massive speedups) can be seen at the following [JSFiddle](https://codepen.io/rafaelcastrocouto/pen/DjvLjV)



### Chapter 3: Callbacks:

- What is meant by the term "Asynchronous": code execution that does not happen sequentially, and is non-deterministic based on outside events and CPU state.
- In this chapter we look at the differences between blocking and non-blocking calls, and *events vs callbacks*.
- **Def: Callback:** a function that a non-blocking process calls when it has finished its task.
- This sounds in principle, similar to an event-handler. But there are major differences:

1) Callbacks interrupt the flow of execution.

2) Callbacks have **closure** over their calling context (such as a function they are called in). Event Dispatchers and Handlers are typically indepedent, and do not share scope.

3) Callbacks are "coupled" to the code that sets them. Whereas, code that sets up an event-handler or fires an event, typically is independent of these two occurences.

4) Traditional error catching for callbacks doesn't work - for an async call with a callback, the catch statement often completes before the callback is finished.

- Callback Cascade: As callbacks are asynchronous, if we have a series of them, we must chain and cascade the calls, if the order of completion matters. For Example:

```
loadC(loadB(loadA()))

```
for A -> B -> C to complete in order. So callbacks turn sequential flow into nested functional calls.

- Note: Anything you can do with callbacks, you can do with setTimeOut() and events as we saw in Chapter 2.
- More on Callback closure: callbacks have access to all of the local context (read, all defined functions and variables) that they were called from. JavaScript performs a closure on this local scope.
- Closure is one of the main advantages of callbacks - events do not have closure over the context in which they are called - this means passing information via event fields to compensate.

- to avoid nested callbacks (to enforce sequential flow), a controller dispatch pattern can be used to organize our callbacks. See example code for further details.

### Chapter 4: Custom Async (Examples):

- "If you want to write JS apps that are responsive, you have little choice but to master the art of crating your own non-blocking async functions"
- In this chapter, we explore cutting up intensive computations into small pieces, to allow the UI thread to still be responsive.
- This particular method is suitable for smaller application and scripts.
- Design Pattern: Async setTimeOut() chunked calls:

```

function compute() {
    var stateObj = {};
    //state fields.

    function innnerComp() {
        //if statement with maximum limit (return)
        //loop with small limit
    //update state
    //update UI
    setTimeOut(innerComp, 0);
    
    }
    setTimeout(innerComp, 0);
}

```



- Post Message Async Call: This follows the same pattern as the setTimeout() structure above. we add the following to the state setup section:

- Note that the above pattern is similar for other async functions (including generators).

```
window.addEventListener("message", innerComp, false);
```

and replace setTimeout with window.postMessage("fireEvent","*").

- Notes on postMessage():

1) This is a general function that sends messages between window objects in a browser. A window object (is roughly) the DOM representation of a TAB in a browser.

2) We can use the postMessage function to get a window to send a message to itself.

3) postMessage(<data>,<origin>) has two arguments: The first can be a string or JSON data object (no function serializations allowed). The second is the Origin (or domain-portnumber). Use * to accept anything, much like CORS.

4) For better security, set the origin to the app's domain name, to avoid external agents from sending messages to your app.

- Another way we can perform small batches of calculations is with Generators - using the yield keyword.

- The yield keyword acts like a return, with the ability to continue where we left off in a function. The intermediate state of the function is saved, and when called again we start where we left off.

- A generator is an Object factory that produces result objects. They are defined as below:

```
function* genName() {
    ...

    yield result;
    ...
}

```

To access and use a generator, we call it like a Constructor method. This gives us a kind of object factory that is iterable with the next() method, and returns us result objects of the form {value:<yield value> , done:<boolean>}.

```

var myGen = generatorName();

myGen.next().value()...

- With a generator, we do not need an "outer" state object like we did with PostMessage() or setTimeOut() functions we defined previously. It provides clean state management, and an abstracted interface for defining iterations of arbitrary size (vs a crude for loop that we used previously).


``


### Chapter 5:

### Chapter 6:

### Chapter 7:

### Chapter 8:

### Chapter 9:

### Chapter 10:



