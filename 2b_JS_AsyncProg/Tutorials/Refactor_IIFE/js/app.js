"use strict";

//Previously, we used async/await with functions we had defined previously.
//How do we use it with a library function like fetch? IIFEs can be modified
//to allow us to use async/await with our code.


(async function() {
  let data = await fetch('https://jsonplaceholder.typicode.com/todos') //code below wont even execute without await here.
  let obj = await data.json(); //If we don't await, we just end up with an unfinished Promise (junk).
  console.log(obj);
})();


/*
fetch('https://jsonplaceholder.typicode.com/todos')
.then(data => data.json())
.then(obj => console.log(obj));
*/

console.log('Other code');
