var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';

    let p1 = fetch(url + 'posts/').then(response1 => response1.json()),
        p2 = fetch(url + 'comments/').then(response2 => response2.json()),
        p3 = fetch(url + 'todos/').then(response3 => response3.json()),
        p4 =  Promise.reject("Testing Static methods")

    Promise.allSettled([p1, p2, p3, p4])
    .then(msg => {
      console.log(msg[0]);
      console.log(msg[1]);
      console.log(msg[2]);
      console.log(msg[3]);
    })
    .catch(err => console.log(`Problem retrieving data: ${err}`));

    //public
    return nsp;
})(MAINAPP || {});
