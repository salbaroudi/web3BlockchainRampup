
const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

//Modifies Data
var storeUser = function(arr, user) {
    return arr.map(function(val) {
        if (val.name.toLowerCase() === user.name.toLowerCase()) {
            return user;
        } else {
            return val;
        }
    });
};

//Pure Functions
const cloneObj = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

var getUser = function(arr, name) {
    return arr.reduce(function(obj, val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            return val;
        } else {
            return obj;
        }
    }, null);
};

var updateScore = function(user, newAmt) {
    if (user) {
        user.score += newAmt;
        return user;
    }
};

var updateTries = function(user) {
    if (user) {
        user.tries++;
        return user;
    }
};

const usr = getUser(users, "Henry");
const usr1 = updateScore(cloneObj(usr), 30);
const usr2 = updateTries(cloneObj(usr1));
const newArray = storeUser(users, usr2);

/*Using currying and composition create a specialized function that always acts on the users array
but allows you to enter a user name. Have it  return a clone of that user.
*/

//Solution: Using Currying: Curry the function and we only pass
const curryGetUser = pipe(curry(getUser)(users), cloneObj);


/*Using your curried function, compose a new specialized function that will be used to update Henry.
(Only invoked if you want to update Henry). It should accepts a new score and then return a new array
that contains the updated score and tries. To compose this function you may need to create other functions.
*/

//Solution 1: Currying with a Main Procedure. Commented rules below were used to build up solution.
const getHenryRecord = curry(curryGetUser)("Henry"); //A constant, not a function.
const curryHenryUpdate = curry(updateScore)(getHenryRecord); //curried function. Supply score
const curryStoreUser = curry(storeUser)(users); //curried function. Supply updated record.
//One Shot!
const updateHenry = function(newScore) {
  return curryStoreUser(curryHenryUpdate(newScore));
};

//Solution 2: Currying with Pipe (more elegent):

const updateHenry2 = pipe(curry(updateScore)(getHenryRecord), curryStoreUser);

//It works!
