## Purpose:

This addendum sub-folder exists to do practice exercies from the book *"JavaScirpt Async: Events, Callbacks, Promises and Async/Await"* by Ian Elliot.
To be honest, even after doing a Udemy course on these topics, I still feel a bit shaky at times on these concepts. Some additional re-inforcement is required.

Summary notes will be posted below per chapter. Coding exercises are also organized by chapter:

### Chapter 1:
- goto caniuse.com to check if a particular JS feature is implemented by modern browsers. 

### Chapter 2: Custom and Standard Events:
- **Note:** The terminology used below is purely conceptual - not canon or standard in modern JS references. It is simply to highlight the underlying workings of JavaScirpt.
- A running JavaScript instance is essentially single-threaded - this thread is the UI Thread. Its main responsibility is to monitor, set and execute events.
- A JS program is essentially a colleciton of event handlers, with the rest of the code kept in a global level. 
- An event in JavaScript is any user-interaction, or pre-programmed occurance that occurs at run-time.
- Events themselves are natively defined and created in the HTML DOM - a code model of the HTML elements on the page. When a user interacts with a DOM object, an event is "fired".
- Events are codified as objects. There is an **Event Dispatch Queue** where they are placed. The UI thread regularly checks to see if there are any events lined up - and works to clear them out quickly.
- By "clearing", we mean that an event is matched to event-handler(s) that have been pre-defined to handle the event. These store functions, that use the event and perform side-effects in our program environment. All event-handlers and their associated functions **run to completion. They cannot be interrupted.**
- **Note:** When an event is fired, the current code in the function/global context is run to completion, before the EventHandler Queue is dealt with.
The *event here is dealt with Asynchronously*, by default.
- **General Rule:** A script level or functional body will run to completion. It is important not to have a piece of code in one of these domains run for too long - or lag will occur.
- The "ideal" JS scirpt is one where the event queue is as empty as possible. Being mindful of event timing and congestion is a major design issue for all larger JS applications.
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

- Multiple events (even the same type of event), can be added to DOM elements with no restriction. Order of execution is **not guarenteed**.

- Custom events can also be defined by the user. These are emitted by code at Run-Time, or by other functions. See Code Examples for details on how to do this.


- We can also genreate custom (non-DOM) targets, to attach our event-handlers to. This is done as follows:

```
const target = new EventTarget();
...
```

- The code examples for custom events utilize the *target.dispatchEvent(e)* function. Note that this behaves *synchronously*. The event will be **dealt with immediately, and is not put in the usual Event Queue to be Asynchronously handled**.

- How do we make them asynchronous? Use the **setTimeout()** function. For example:

```
//some code before
setTimeout(function() { //some statements },time)
//some code after

```
When set time out is called, our function is put on the event dispatch queue, and a timer is set. When the timer reaches zero, the function is run. Note that this behaviour is a bit different from queuing an emitted event, and matching with the registered event-handler. 

- Another way we can get asynchronous behaviour is with the **postMessage()** function. This has an advantage over setTimeOut(), as even with a delay of 0 - there can be 10s of milliseconds before the event is actually queued. 
- Generally: the setTimeOut() method allows us to dispatch upto 200 events/s. With Post Message, this is increased by a factor of 100.
- Some example of other asynchronous calls (with massive speedups) can be seen at the following [JSFiddle](https://codepen.io/rafaelcastrocouto/pen/DjvLjV)



### Chapter 3: Callbacks:

- **Def: "Asynchronous":** code execution that does not happen sequentially, and is non-deterministic based on outside events and CPU state.
- In this chapter we look at the differences between blocking and non-blocking calls, and *events vs callbacks*.
- **Def: Callback:** a function that a **non-blocking process** calls when it has finished its task.
- This sounds in principle, similar to an event-handler. But there are major differences:

1) Callbacks interrupt the flow of execution.

2) Callbacks have **closure** over their calling context (such as a function they are called in). Event Dispatchers and Handlers are typically indepedent, and do not share scope.

3) Callbacks are "coupled" to the code that sets them. Whereas, code that sets up an event-handler or fires an event, typically is independent.

4) Traditional error catching for callbacks doesn't work - for an async call with a callback, the catch statement often completes before the callback is finished.

- Callback Cascade: As callbacks are asynchronous, if we have a series of them, we must chain and cascade the calls, if the order of completion matters. For Example:

```
loadA(loadB(loadC()))

```
for A -> B -> C to complete in order. So callbacks turn sequential flow into nested functional calls.

- Closure is one of the main advantages of callbacks - events do not have closure over the context in which they are called - this means passing information via event fields to compensate.

- to avoid nested callbacks (to enforce sequential flow), a controller dispatch pattern can be used to organize our callbacks. See example code for further details.

- Callbacks interrupt the *flow of control* - if we want code after an asynchronous callback to be handled after the callback is completed, we need to nest the after-code. 

- **Example 1**: I have a file load function that fetches data from a remote source. We wish to process the data with a callback, when the file download is complete. With JS, a non-blocking function will move on to the after-code. But this cannot run until the file is loaded. So now we need to set the after-code as a callback, and move on further to execute other statements later on the program.


### Chapter 4: Custom Async (Examples):

- *"If you want to write JS apps that are responsive, you have little choice but to master the art of crating your own non-blocking async functions"*
- In this chapter, we explore cutting up intensive computations into small pieces, to allow the UI thread to still be responsive.
- This particular method is suitable for smaller application and scripts.
- Design Pattern: Async setTimeOut() chunked calls:

```

function compute() {
    var stateObj = {};
    //state fields.

    function innerComp() {
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

```
window.addEventListener("message", innerComp, false);
```

and replace setTimeout with window.postMessage("fireEvent","*").

- Note that the above pattern is similar for other async functions (including generators).

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



```

- With a generator, we do not need an "outer" state object like we did with PostMessage() or setTimeOut() functions we defined previously. It provides clean state management, and an abstracted interface for defining iterations of arbitrary size (vs a crude for loop that we used previously).

### Chapter 5:

- In this chapter we discuss the Worker Thread - a restricted form of thread that does work, and is spawned/connected to the main UI thread.
- This method of Async programming is truely multi-threaded (not shared as with other methods). On a multi-core system, the worker thread is run on a separate core.
- Worker Threads have some restrictions - to avoid deadlocks and the problems with concurrent execution and access. Note the following:

1) *Loading:* Worker Threads need to be launched from files. The script for a Worker Thread is saved in a file, and loaded.

2) *Spawn Point:* Worker Threads are spawned by UI Threads, (they are an object).

3) *Exclusivity:* Worker Threads do not share objects or resources with UI Threads. Worker and UI can communicate with object message passing, via the postMessage() method. Events are spawned in one thread, and handled in another thread.

4) *More Restricted Sandbox:* Worker Threads do not have access to the UI DOM Model, or a lot of the browsers usual resources. Any library that a WT loads, that requires such resources (such as AJAX, which uses DOM), will not function correctly.

5) *Strict JSON Encodings:* The "Worker" Object pipe between UI and WT has a restricted format for communication. Data Objects with fields can be shared, but functions and other executable blocks of code cannot be stringified.

- Non DOM / independent libraries can still be loaded into a Worker Thread (use CDN's for example).

- Communication Cross-Over: When UI and WT communicate with postMessage(), realize that the event is spawned at a source, and event-handler is stored at the target. So both UI and WT have event triggers and handlers stored in them, to allow for 2 way communication.

- Chrome Hangup: Chrome does not allow WebWorkers to be loaded from file:// sources (Firefox does however). By running a nodeJS local webserver (localhost:8000...), one can override this. 

```
npm start 
"start":"http-server -p 80001 -c-1"

```
- As a JS Thread, Worker still has a global scope level for statements, and an Event Queue, *just like the UI thread does*. They behave similarly. So all the Asynchronous Issues we have with the UI thread also apply to Worker. Recall that a thread in the middle of a long running task will finish its task, before the Event Queue is looked at.

- The UI Thread can only interact with the worker with two methods: terminate() and postMessage().

- For the Worker to self-terminate, it must use the close() method.

### Chapter 6: Beginning Promises.

- Promises are a specific way of organizing callbacks, specifically designed to allow for sequences of callbacks to be run.

- A promise object has the following mutually-exlusive states:

1) Pending: This is when the promise is first created, and returned.

2) Fulfilled: when our async call has finally returned. The resolve() callback will be called ASAP at this point.

3) Rejected: when our async call fails to return, or returns error. The reject() will be called ASAP at this point.


We also say a promise is "settled", when it is fulfilled or rejected.
Promises also have ["Fates"](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 

1) Resolved: Occurs when the resolve() or reject() functions have no effect on its current state. In other words, it has been fulfilled or rejected, or follows another promise (and accepts its values).


2) Unresolved: resolve() or reject() will have an impact on its state. So pending.

Basic Properties of a Promise:

1) A Promise Constructor() returns a Promise Object when called. This object has a state (of pending), while it waits for asynchronous work to be completed.


2) The idea of a promise is that it waits until the asynchronous code is complete. Once this happens, it executes one of two callback functions, onComplete or onError. Nothing happens when the promise is waiting - and you can be sure one of the two callbacks will be run when a return occurs.

3) Promises handlers (using the .then() method) can be set multiple times. However, they may not run in the order they were set.

4) Promises can only return a single value - however a packaged object can be used.

5) Promises have access to two private methods - resolve() and reject(). These are called when async work has completed, and will lead to the onComplete or onError callbacks being fired, respectively.

- The Structure of a Basic Promise:

```
//Making a Promise:

function delay(t,p) {
    var promise = new Promise(
        function (resolve, reject) {
            //It is at this point, where the asynchronous code actually runs (with SetTimeOut())
            setTimeout(
                function () {
                    var r = Math.random();
                    if (r > p) {
                        resolve(r);
                    }
                    else {
                        reject(r);
                    }
                },t);
        });
    return promise;
}

//Set-up and Use:
var promise = delay(1000, 0.5);
promise.then(function(r) {
    console.log("Resolved was successful, r=" + r);
}, function (r) {
    console.log("Reject has occured, r=" + r);
});

```
Notice the following:

1) Our Promise object *takes an executor function, with two functional arguments.* These arguments functions defined in the promise constructor.

2) The asynchronous code in the promise is contained in its outer-functional body (setTimeout)

3) The promise must use both functional arguments, to handle either case when it is settled.

4) We don't have to wrap the Promise() in a function, but this can help as it provides an additional scope of parameters.

5) When the promise is finished, the resolve/reject arguments settle the promise state, and set its value field. The callbacks in a .then() can be called (they do not directly map).

- You can add as many .then()s as you want to a promise, either chained or independently. There is no guarentee that indepedent thens() are handled in the order that they are added.

#### Chaining Promises:

Promises are meant to be chained. This allows for sequential ordering of a series of asynchronous calls. By chaining, we mean a series of .then() calls, in succession. 

Builidng a chain effectively crates a queue of onComplete/onError functions, that are executed sequentially.


- The *value of each promise* in the chain is whatever the previous onComplete/onError returns;

- the .then() itself returns a Promise, not the onComplete/onError. So when you write your oC/oE functions, you can just return values naturally.

- In order for the chaining to work, the previous link in the chain must return a Promise to the next .then() method. Recall that .then() is a Promise method.

-  so the onComplete produces the resolved value of the Promise, and the onError produces the rejected value of the Promise.

- note that you can use named function for the onComplete and onError functions - you don't need to include their functional headers. Named functions allow debugging stack traces to actually name the code (vs just diplaying an anonymous line of code.)

- Promises can be combined in the Promise.all() and Promise.race() calls. These take an array of promises [p1, p2,...] as an argument.

- Promise.all will return a final promise only after all promises have settled. The value of this final promise is an array of returned results.

- Promise.race will return the result of whatever Promise finishes first. The rest of the Promises will be ignored, and there results abandoned.

#### Error Handling in Promises:

- our onError function for then() normally will deal with errors.

- note that it is the Programmers option to throw an error if detected - you can still choose to cointinue the program.

- If an exception is thrown, the Promise chain is terminated automatically.

- if an onComplete or onError handler is missing, the Promise is passed to the next .then() statement, and those handlers are used.

- A common Promise Chain idiom is to make the last then() statement a catch all, for simple error handling (use the catch(onError)) statement.

#### The Then Promise Chain: All possible results:

If a handler is in a then() call...

1) Returns a Value: the promise returned by then() gets resolved with the returned value as value.

2) Throws an Error: the promise returned by then gets rejected, with thrown error as its value.

3) Returns a Resolved Promise: the Promise returned by then takes the former Promises value, and uses it to settle (effectively "passes it on").

4) Returns a Rejected Promise: Again, former promise value is taken, and state is set to rejected (effectively passes it on). 

5) Returns another Pending Promise: the then method will just "pass-on" a promise with the same fulfilled/rejected state and value, as the returned Pending Promise.

6) ...If there is no handler for the current state of Promise: Then it is passed to the next .then() statement to be handled (if handler available).

### Chapter 7: How Promises Work / Producing Promises:

- In chapter 6 we saw the delay() example, where we produced a promise in the function, which was constructed with the folloing function: f(resolve,reject).
- It is important to realize that resolve and reject are **not** mapped to, nor substituted with, onComplete and onError. 
- These functions (resolve, reject) are *private functions* inside the Promise object. They can be called, but not inspected.
- The Promise standard makes use of the *Revealing Constructor Pattern* to keep resolve and reject private, while allowing the code that creates the Promsie to submit the constructor a function tha tmakes use of them.
- A Promise Contructor: Promise (<executor>), where <executor> is a function that has *resolve and reject (R/R)* parameters.
- In the executor function, our asynchronos calls and behaviour must be placed, and after it executes, we must call R/R. These pass our value(s) from the asynchronous calls to one of our callbacks, and change the internal state of the Promise.

- In general, the only entity that can change the internal state of a Promise is whatever spawns it. Those that use promises can interact/wait for them, but cannot just set the state of them.

- **Simple (Pseudo-Model) of Promise Constructor**: Promises achieve this by using the Revealing Constructor Pattern, as illustrated by the code below:

```
function myClass2(func) {
    var myPrivateVar = Math.random();
    var reveal = function () {
        return myPrivateVar;
    }
    func(reveal);
}

//This works because we are using functions, and we cannot inspect variable statements (they are private anyways.)
var myObject = new myClass2(
    function (revealArg) {
        console.log(revealArg());
    });


```
With this code, we can reveal the inner state of the promise to an external caller, but the caller cannot see/change the myPrivateVar in the function. This works via closure when our function/constructor is called for the first time.

- **Then Parameter Problem:** Then takes anonymous or named callbacks, but cannot take callbacks with preset arguments. This is because if JS encounters <function>(arguments), it will automatically invoke the function on the spot. 

- To avoid overusing globals, or "fixing" our callbacks, we can use **currying and closure** to reduce a functions argument string to zero. For example:

```
//Wont work.
delay(100,0).then(delay(1000,0))

//Try:
delay(100,0).then(function () { delay(1000,0);})

```

- **Thenable:** Any object that possesses a .then() method. All Promises are Thenables, but not all thenables are objects. We can convert some objects to work in Promise coding patterns, but adding .then() method attributes to them at Run-Time.

- There is an extended example of converting PiWorker to work with Promises. This uses (likely) obsolete JS methods to do so, so I avoid going through it. The author essesntially subclasses Promises in a basic way.

### Chapter 8: Tasks and Microtasks:

- Recall that each Thread of Execution (both UI and Worker) gets its own queue. 
- All windows of the same origin also share the same queue - this is how postMessage communicates with events.

- There is an additional queue that is present in the JS Engine for each thread, this is the Microqueue. Promises utilize this queue.

- **A Better Model of the Dispatch Queue(s) and Asynchronous Event Driven Execution:**

    - Objects: UI Thread, Dispatch Queue, MicroQueue.

    - Sequence of Operation: Task Ends -> All microtasks cleared out -> UI Update -> Next Task

    - Microtasks always have priority, and run between UI/regular tasks.

    - Remember, even if there are many tasks in the queue, we switch *back* to the Microqueue after every task.

- To add a MicroTask, we can do this one of two ways:

1) With a Promise Object, we can use the .then(onComplete,onError). This turns our callbacks into microtasks.

2) We can use:

```
Promise.resolve().then(function() { ... your code ...})

```

To wrap a function or block of code into an expident microtask.

- Because Promises utilize the MicroQueue, and it overrides Tasks (do all vs do one), Promises are not fully-asynchronous (!)

- For Node.JS (backend) programming, we can use setImmediate() and process.nextTick() to set Tasks and Microtasks, respectively.

- Again, there is no standard way to set a Task with Vanilla JS. Just use setTimeOut, or postMessage (if you need extreme speed).

### Chapter 9: Async and Await:

- With an understanding of Promises, we are finally at the point of understanding **Async and Await.**

- Async and await transform asynchronous code into synchronous code for us (a series of async statements, anyways...)

- First, there are two rules to understand about these key-words:

    Rule1) Every "async" function returns a Promise.

    Rule2) You can only use "await" with, (or within) an async Function.

#### The Effects and Usage of "async":

- Async will convert a function to an AsyncFunction, which has the following properties:
     1) This is a special function that allows for exit and re-entries (similar to the yield functionality).
     2) All function return values are wrapped in a Promise.

- Basic Usage:

```

var myFun = async function {
    ///your code.
    return result;
}

async function funName() {
    // your code
    return result;
}

//Notice that we need to do an IIFE to get the promise, unlike our previous chapter code.
myFun().then(function (value) { console.log()....})


```
#### The Effects and Usage of "await":

- Await can only be used with an AsyncFunction, because only it has the capability to exit and reenter at arbirary points of computation.
- The Await operator will unwrap a promise (and extract its value), when the async function has returned.
    1) If the Promise resovles, the await operator extracts the value and returns it.

    2) If the Promise rejects, the await operator throws and error with the reject value.

    3) If you happen to use await on a non-Promise, it just returns the value.

- an await can analogously be thought of as a kind of *yield* statement.

- So our auto-generated Promise exists between when our Async function is called, and Await is handed a fulfilled promise from the async function.

- Also note, we need to be in an async scope to use await, but the function call we await does not have to be async - even those that handle promises.

- **(!!) Await allows us to unpackage a promise, and extract its value**. This is how you are supposed to get values out of a chain of .then() statements.

#### Error Handling with Async-Await:

- **In addition to the unpackaging fulfilled promises, await allows us to use straight-forward try/catch errors. A rejected promise will have its value wrapped in an Exception object. We can try-catch as we normally would (with synchronous code)**. See code example below:

``` 
async function myFun() {
    try {
        var r = await delay(p,t);
    } catch (v) {
        //handle or report error
    }
    return r;
}

```
- Any await code not wrapped in a try/catch will cause an rejected Promise to be returned, and an error will be raised on Console.



#### A Break-down of Async Await in Action:

- See the script.js example for details - it is documented there and can be explored in JS console.

- Some important points to remember:

1) Despite all of our new async machinery, we are still at the mercy of JS fully completing tasks (read: blocks of code at a given level), before it even looks at the Event or MicroTasks Queue. If we had a large amount of code at the global level, we could easily stall our first await line in the example.

2) Promises are returned in a pending state, if we return to the calling function with an await.

3) The await statement is resumed (re-entered) when the Promise it depends on is settled. Of course, we may run out of code at a global context before this happens. In which case we sit and block at the await statement.

4) Top level (global) code can never be made async. Only functions can.


#### So what does Async-Await do for us, in the end?

- We have went on a long journey, investigating event queues, callbacks, async calls and Promises. These were all insufficent for the following reasons:

1) Callbacks interfere with flow of control, and to get sequentially executing non-blocking functions to work, we had to nest them.

2) We tried to stop freezing our UI by breaking up our event handling, or computationally intensive code into small chunks, event queuing tasks with setTimeout and postMessage hacks. If we balance our code correctly, we can get good UI and result response. However this may not work for large scale pieces of code, it is also fairly hacky/custom, depending on the application.

3) We tried using WebWorkers, which gave us a 2nd thread to do work. But they also have a task/microtask queue, just like the UI, and suffer from all the same problems as we started with (UI that gets frozen.).

1-3b) For all of the examples above, error handling was not always so simple.

4) We Tried Basic Promises. Basic Promises on their own, when set in sequence, may not sequentially finish as we would like, however (see loop example in script.js). Error handling did get easier, with promises however. 

5) We Combined Promises with our usual setTimeout, postMessage hacks, and this does work reasonably well however...

**Async and Await guarentee that asyncronous, non-blocking code will execute sequentially, allow for caller functions to continue doing work (if there is some to do), and does this with simple and short keyword syntax, compared to what we see in attempts 1-4. In addition, we can use await in parallel (see examples), getting fast results that still occur in sequence. It is a complete solution.**