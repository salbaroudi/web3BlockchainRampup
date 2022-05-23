"use strict";

/*
Refactor the promise code to create an async function that will take a todo
object as a parameter and add the todo to the jsonplaceholder site.

Make sure you account for possible errors.
*/

//Post Object to update records.
/*let todo = {
    completed: false,
    userId: 1,
    title: "Learn Promises"
};*/

//we can't async/await with this blackboxed function. Lets use an IIFE as shown
//in lecture.

/*

fetch('https://jsonplaceholder.typicode.com/todos/', {
    method: 'POST',
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(todo)
})
.then(resp => resp.json())
.then(obj => console.log(obj))
.catch(reject => console.log(`Unable to create todo ${reject}`));
*/

//This code works. However, it is not necessary to make an IIFE. You could have
//just used a function expression with the async keyword. Either works.

(async function() {
  try {
    let todo = {
        completed: false,
        userId: 1,
        title: "Learn Promises"
    };

    let pushData = await fetch('https://jsonplaceholder.typicode.com/todos/', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(todo)
    });

    console.log(pushData)

    let processData = await pushData.json();
    console.log(processData);

  } catch (e) {
    console.log(`Unable to create todo, because:: ${e}`);
  }
})();

console.log('Other code');
