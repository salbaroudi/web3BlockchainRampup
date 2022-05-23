"use strict";

//Async is a funcitonal modifier that forces its return value to be wrapped in a promise.
//Even a no return value function will still return a (data-free) Promise.
//The promise returned is always "resolved" in status.

const plainFunction = async function() {
  console.log("start");
  return "Done";

}

var result = plainFunction()
.then(res => console.log(res));


const asyncFun = async function() {
  let p1 = await asyncFunction();
  console.log(p1);
  console.log(`${p1} - More Information`);
}

asyncFun();


//Await Keyword:
/*
- can only be used inside an async function.
- waits for a promise to complete. Code in a function will PAUSE and not just continue on.
- causes the async funciton to pause.
*/
