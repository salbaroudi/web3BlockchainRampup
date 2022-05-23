
//In this example, we continue with our User Records Example, and now use
//Our Map Apply and Filter methods in place of our current constructs, when appropriate.

const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

//Modifies Data
//Use the Map Method in place of the FOR, and return a new array with new data.
//need to make a return line, and send off the deep copy array!
var storeUser = function(arr, user) {
  let newArr = arr.map(function(val) {
    if (val.name.toLowerCase() === user.name.toLowerCase()){
      return user;
    }
    else {
      return val
    }
  });

  return newArr;
};

//Pure Functions
const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

//Use filter to access a particular user.
var getUser = function(arr, name) {
  let userArrSelected = arr.filter(function(val) {
      return (val.name.toLowerCase() === name.toLowerCase())
  });

    return userArrSelected[0];
};

//Stays the same (only acts on one field).
var updateScore = function(user, newAmt) {
    if (user) {
        user.score += newAmt;
        return user;
    }
};

//Stays the same (only acts on one field).
var updateTries = function(user) {
    if (user) {
        user.tries++;
        return user;
    }
};

const usr = getUser(users, "Henry");
const usr1 = updateScore(cloneObj(usr), 30);
const usr2 = updateTries(cloneObj(usr1));
const users3 = storeUser(users, usr2);
