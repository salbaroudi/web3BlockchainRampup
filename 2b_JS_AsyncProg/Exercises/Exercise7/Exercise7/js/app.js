var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    /*
    The following promise code is inside a module pattern.
    Change the promise code so that it uses async await instead.
    You will want to use an IIFE for this. Make sure to catch any errors.

    What happens if we put a .then() chain on the response?
    => Await breaks the promise chain, so we get an error.



    */
    (async function() {
      try {
        //getPosts is not a promise. Await will break out the promise.
        let getResponse = await fetch(url + 'posts/');
        console.log(getResponse);
        let getPosts = getResponse.json(); //await needed? yes, .json() returns a promise.
        nsp.posts = getPosts;
        console.log(getPosts);
      }
      catch (err) {
        console.error(`Problem retrieving posts: ${err}`);
      }
    })();


    //public
    return nsp;
})(MAINAPP || {});
