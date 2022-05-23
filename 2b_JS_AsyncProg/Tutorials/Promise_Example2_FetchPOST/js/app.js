"use strict";

//Let us grab some data from the website, to start.
fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(data => data.json())
.then(obj => console.log(obj));

let todo = {
  completed: false,
  userId: 1,
  title: "Promises, Promises..."
};

//This is a basic example of a POST that updates a record on the server
fetch('https://jsonplaceholder.typicode.com/todos/', {
  method: "POST", //Here we can form our post parameters to send in an object
  headers: {
    "Conent-type": "application/json"
  },
  body: JSON.stringify(todo) //must convert before sending over.
})
.then(resp => resp.json())
.then(obj => console.log(obj)) //we get back a status of 201 TODOs.
.catch(reject => console.log("Unable to create todo ${reject}"));

console.log("Other Code");
