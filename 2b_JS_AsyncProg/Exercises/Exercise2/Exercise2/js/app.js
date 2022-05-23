/*
  So the code below fails.

  If we do three fetch statements and just
  do nsp.var = var assignments at the end, we end up with empty arrays
  after the IIFE has executed.

  In order to stop the assignment statements from running before the asynch
  code, I tried to do all fetch and assignment work in the Promise chain.
  This does not work either, however. We end up with fulfilled promises,
  and not the arrays themselves.

  To unwrap the response.json(), we need to do another THEN call to access
  the data. doing response.json() and then assigning in the same call will
  not unwrap the promise. So you can't do everything in one THEN statement
  for brevity.

  In the solution, we have independent promise chains where the assignment
  work is done **in the chain**.

  We also learned that eventhough fetch is a kind of promise, we don't have
  any way to really query if a fetch has finished, until the response comes
  back.

  There are still pieces to this puzzle that are missing.

*/

var MAINAPP = (function(nsp) {
    "use strict";

    let posts = [],
        comments = [],
        todos = [];

    /*
    This IIFE is the start of an application.

    The first thing we want to do is download all the posts,
    comments and todos so that we can work with them.
    Add the code in order to do that.

    */
    let baseURL = "https://jsonplaceholder.typicode.com/";

    //This was a mess to balance braces and parens, and organize. This is callback hell.
    fetch(baseURL + "todos/")
    .then(response1 => response1.json())
    .then(function(todos) {
      nsp.todos = todos;
      fetch(baseURL + "posts/")
      .then(response2 => response2.json())
      .then(function(posts) {
        nsp.posts = posts;
          fetch(baseURL + "comments/")
          .then(response3 => response3.json())
          .then(function(comments) {
            nsp.comments = comments;
          })
      })
    });

    /*
    Also, make sure that you add the posts, comments and todos to the
    MAINAPP variable so they are accessible outside this function
    (e.g. nsp.posts = posts & return nsp).

    Because the code is asynchronous, you will need to consider the best way to do that.
    */

    //public
    return nsp;
})(MAINAPP || {});
