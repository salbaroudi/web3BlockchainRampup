/*
  We return to this example from Exercise 1. Now, we can clone objects and
  get around JS's Pass by Reference. We work on individual user objects in the
  array, and write back to the original array.


*/

var users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];


//Support function: cloneUser()
//Signature: Object -> Object
//Purpose: Perform a deep copy of an object located at a given pointer, and return the copy.
let cloneUser = function(copyObj) {
  return JSON.parse(JSON.stringify(copyObj));
};


//Modifies Data: Here we just point to the object we passed in. OK.
var storeUser = function(arr, user) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === user.name.toLowerCase()) {
            arr[i] = user;
            break;
        }
    }
};

//Pure Functions
var getUser = function(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === name.toLowerCase()) {
            return cloneUser(arr[i]); //Modification.
        }
    }
    return null;
};

var updateScore = function(user, newAmt) {
    if (user) {
        let dCUser = cloneUser(user); //Modification.
        dCUser.score += newAmt;
        return dCUser;
    }
};

var updateTries = function(user) {
    if (user) {
        let dCUser = cloneUser(user); //Modification.
        dCUser.tries++;
        return dCUser;
    }
};

//Instructor asks that we make changes so that we do not modify the original
//array, and that usr, usr1 and usr2 do not all change together. So we return
//a deep copy everytime.
let usr = getUser(users, "Henry");
let usr1 = updateScore(usr, 30);
let usr2 = updateTries(usr1);
//storeUser(usr2);
