var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    Change this code to use async await. Make sure to use promise.all so that we
    await all three pieces of data without awaiting each individually which would take much longer.

    Which pattern do you prefer for this application? promises or async await?
    Async Await is preferred.
    */

    /*I actually can't get the resp1 vaule to print out. Why is it empty?

    Answer:
    You don't need to wrap fetch() in a promise. It already is a promise. (Extraneous)
    I was copying code templates too much, which lead to complications.

    */

    (async function() {
      try {
        //Overkill - an extra level of Promise not needed.
        let postPromise = function() {
          return new Promise(function(res,rej) {
            console.log(url + 'posts/');
            fetch(url + 'posts/');
          });
        }
        let commentPromise = function() {
          return new Promise(function(res,rej) {
            fetch(url + 'comments/');
          });
        }
        //array of result arrays.
        let resp1 = await Promise.all([postPromise(), commentPromise()]);

        console.log(resp1);
        //The right idea, but my new Promise() code stopped this from working.
        nsp.posts = await response[0].json();
        nsp.comments = await response[1].json();


      }
      catch (err) {
        console.log(`Problem retrieving data:: ${err}`);
      }
    })();


    /*
    fetch(url + 'posts/')
    .then(response1 => response1.json())
    .then(posts => nsp.posts = posts)
    .catch(err => console.log(`Problem retrieving posts: ${err}`));

    fetch(url + 'comments/')
    .then(response2 => response2.json())
    .then(comments => nsp.comments = comments)
    .catch(err => console.log(`Problem retrieving comments: ${err}`));

    fetch(url + 'todos/')
    .then(response3 => response3.json())
    .then(todos => nsp.todos = todos)
    .catch(err => console.log(`Problem retrieving todos: ${err}`));
    */
    console.log("Remaining Code.")

    //public
    return nsp;
})(MAINAPP || {});
