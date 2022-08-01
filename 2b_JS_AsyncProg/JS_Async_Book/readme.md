## Purpose:

This addendum sub-folder exists to do practice exercies from the book *"JavaScirpt Async: Events, Callbacks, Promises and Async/Await"* by Ian Elliot.
To be honest, even after doing a Udemy course on these topics, I still feel a bit shaky at times on these concepts. Some additional re-inforcement is required.

Summary notes will be posted below per chapter. Coding exercises are also organized by chapter:

### Chapter 1:
- goto caniuse.com to check if a particular JS feature is implemented by modern browsers. 

### Chapter 2: Custom and Standard Events:
- Note: The terminology used below is purely conceptual - not canon or standard in modern JS refernces. It is simply to highlight the underlying workings of JavaScirpt, it a practical way for someone to grasp what is going on, under-the-hood.
- A running JavaScript instance is essentially single-threaded - this thread is the UI Thread. Its main responsibility (and top-priority) is to monitor, set and execute events.
- A JS program is essentially a colleciton of event handlers, with the rest of the code kept in a Global Namespace. When events are not being dispatched or called-back  on, focus shifts to the Global space where scripts live.
- An event in JavaScript is any user-interaction, or pre-programmed occurance that occurs at a given time.
- Events themselves are actually defined and created in the HTML DOM - a code model of the HTML elements on the page. JS can access and reference the events that spawn from this object-tree instance.
- Events are codified as objects. There is an event-queue where they are placed. The UI thread regularly checks to see if there are any events lined up - and works to clear them out quickly.
- By "clearing", we mean that an event is matched to event-handler(s) that have been pre-defined to handle the event. These store callback functions, that use the event and perform side-effects in our program environment. All event-handlers and their associated callbacks **run to completion. They cannot be interrupted.**
- The "ideal" JS scirpt is one where the event queue is as empty as possible. If the queue gets overloaded with too many events, UI responsiveness will suffer. Being mindful of event timing and congestion is a major design issue for all larger JS applications.

#### Event Handler Registration:

- Basic Event Handling is set with HTML properties, with the familiar on<Event> handlers:

```
<div onclick="eventhandlername">

```

- Using core JS, we can add and remove event handlers with the following code. Note that removeEventListener can remove events that were added by addEventListener - it may not do it with other methods.

```
//Define named function f1(), f2()... and object button1

document.getElementById("idname").onclick=functionname

removeEventListener("click",f1,false)

button1.addEventListener("click",f2,false);
```

- Multiple events (even the same type of event), can be added to DOM elements with no restriction. Order of execution is not guarenteed, however.

- 

### Chapter 3:

### Chapter 4:

### Chapter 5:

### Chapter 6:

### Chapter 7:

### Chapter 8:

### Chapter 9:

### Chapter 10:



