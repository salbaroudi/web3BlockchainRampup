/*

Create a function that will retrieve the posts from the
jsonplaceholder site (https://jsonplaceholder.typicode.com/posts).
Set up the function so you can pass in the userID and the function
will assign only the posts for that user to a variable.

The data should be stored in an array.

*/

/*Code Comments:

We must access the posts via GET Request, and then filter on the results
to pull out a particular user.

I got most of this exercise. I struggled with getting the data out of the function,
as async returns a promise.

If you have a returned promise, you use the .then() method to extract the data from
a promise. I forgot the first rule of promises!
*/

let arr = []; //How do we make it persistent?

const pullUserPosts = async function(uID) {

  let baseURL = "https://jsonplaceholder.typicode.com/posts";

  //Await unpacks the promise, and gives us an array of results.
  let posts = await fetch(baseURL).then(resp => resp.json());

  //Let us filter our results and print
  return  posts.filter(post => post.userId === uID);
}

//We can't return from an async function, as it will return a promise!!
//Test Example.

//Use the then() method to pull the data out of the Promise!!
arr = pullUserPosts(5).then(data => arr = data);
console.log(arr);
