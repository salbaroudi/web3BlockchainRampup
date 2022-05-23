
/* For this exercise, we take our side-effect laden functions and rewrite them,
trying to minimize side effects and use pure functions.

We have an array "database" that needs to be modified.

Note that we don't have the tools to get around JavaScript's pass by reference
for objects - so our methods will still change state.

The "pure functions" are written **as if** JS does deep copies (it does not).

We will do the following:

1) Dump the currentUser global variable. No need.

2) Create a function that updates user records. This will cause a side-effect,
but it is the only function that should (in theory) write to the data array.

3) Create a getUser function - we find a user by name, by using a for loop
and looping over the entire array.

4) Feed the found record into our pure funciton, perform operation,
and then return the record.

Usage of Functions:

1) Access record to be changed
2) Apply changes to record
3) Write record to array database.

*/

//An array of objects, with three fields each.
//Structure: Integer -> {Object --> Fields}
users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4},
    {name: "Henry",score: 80,tries: 3}];

//Signature: Object Array, String -> Object
//Search for a particular user, and return its record. Throw error otherwise.
var accessUser = function(uName,userA) {
  for (let i=0; i < userA.length; i++) {
    if (userA[i].name.toLowerCase() === uName.toLowerCase()) {
      return userA[i];
    }
  }
  console.error("ERROR: Did not find user!");
};

//Signature: Object integer -> integer
//Usage: save result into a constant, and then change records at the end.
var updateScore = function(userRecord,newAmt) {
    return userRecord.score + newAmt;
};

//Signature: Object integer -> integer
//Usage: save result into a constant, and then change records at the end.
var updateTries = function(userRecord) {
    return userRecord.tries + 1;
};

//Signature: String String <Various> -> VOID
//We access the array with side-effects. But this is the only point of access,
//in theory.
//We take in the database, user to find, and its new updated pair.
//Nest the above function calls into this functions argument list.
var updateUser = function(uName,field,data) {
  let target;
  for (let i=0; i < userA.length; i++) {
    if (users[i].name.toLowerCase() === uName.toLowerCase()) {
      target = users[i];
    }
  }
  //We will not change names for this problem.
  if (field === "score") {
      target.score = data;
  } else if (field === "tries") {
      target.tries = data;
  }
};

//Testing our Code:
let key = "Mary";
let firstUser = accessUser(key,users);
updateUser(key,"score",updateScore(firstUser,25));
updateUser(key,"tries",updateTries(firstUser));
