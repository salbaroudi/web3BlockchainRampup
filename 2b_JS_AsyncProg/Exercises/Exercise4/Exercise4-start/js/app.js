var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    Change this code so that it uses Promise.all to respond once all of the promises have returned. Provide a notification to the console when the promises have completed.
    Lets wrap our fetches in functions, and return them.
    */


    //This code works, but is not very good.
    //See the solution for better code.
    //Once again, I am overrelying on previous examples instead of thinking it through.
    //Awkward code is the result.

    //Why not use a function expression?
  function postPromise() { //why not do the THEN assignment in the promiseALL?
    return fetch(url + 'posts/').then(response1 => response1.json()).then(posts => nsp.posts = posts);
  }

  function commPromise() {
    return fetch(url + 'comments/').then(response2 => response2.json()).then(comments => nsp.comments = comments);
  }

  function todoPromise() {
    return fetch(url + 'todos/').then(response3 => response3.json()).then(todos => nsp.todos = todos);
  }

  //For Promise.all(), we must provide an array of three sub-promises.
  //Recall that Fetch returns a promise.
  Promise.all([postPromise(), commPromise(), todoPromise()])
  .then(function(resultArr) {
    resultArr.map(elem => console.log(elem)); //at least I used map correctly.
  })
  .catch((msg) => console.log('ERROR detected ' + msg));

  //public
  return nsp;
})(MAINAPP || {});
