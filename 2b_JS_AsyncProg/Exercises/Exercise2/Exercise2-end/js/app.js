var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    This IIFE is the start of an application.
    The first thing we want to do is download all the posts, comments and todos
    so that we can work with them. Add the code in order to do that.
    Also, make sure that you add the posts, comments and todos to the MAINAPP
    variable so they are accessible outside this function (e.g. nsp.posts =
    posts & return nsp). Because the code is asynchronous, you will need to
    consider the best way to do that.
    */
    fetch(url + 'posts/')
    .then(response1 => response1.json())
    .then(posts => nsp.posts = posts) //This second line to unwrap the data is critical. Don't one line it.
    .catch(err => console.log(`Problem retrieving posts: ${err}`));

    fetch(url + 'comments/')
    .then(response2 => response2.json())
    .then(comments => nsp.comments = comments)
    .catch(err => console.log(`Problem retrieving comments: ${err}`));

    //Notice that fetch must engage the message queue on its own - no setTimeOut needed
    //to make our code async => (read: put on message queue so other functions can run).
    fetch(url + 'todos/')
    .then(response3 => response3.json())
    .then(todos => nsp.todos = todos)
    .catch(err => console.log(`Problem retrieving todos: ${err}`));

    //public

    //And just to prove it is asynch:
    console.log("Code after the Asynch Calls 1")
    console.log("Code after the Asynch Calls 2")
    console.log("Code after the Asynch Calls 3")


    return nsp;
})(MAINAPP || {});
