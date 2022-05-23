/*
The purpose of this final assignment is to make our user record code as functional as possible.
Use any of the following constructs:

- currying and partial application.
- passing state objects through functions.
- making pure functions
- composing pipelines of composite functions, from basic pure functions.
- minimizing mutation and side-effects, as necessary.
- deep clone of objects, to avoid mutation.
- RMF for looping operations on arrays.

*/

const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

var storeUser = function(arr, user) {
    return arr.map(function(val) {
        if (val.name.toLowerCase() === user.name.toLowerCase()) {
            return user;
        } else {
            return val;
        }
    });
};


//Leave as is.
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

//Curry get user by supplying array



//These exploit mutation of objects
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

//Rewrite the curried pipeline functions in Ramda notation:

/*
const getUsersUser = pipe(
    curry(getUser)(users),
    cloneObj);

const getHenry = function() {
    return getUsersUser("Henry");
};

const updateHenry = pipe(
    curry(updateScore)(getHenry()),
    cloneObj,
    updateTries,
    curry(storeUser)(users));
*/

//We feed in a user name to start it.
const getUsersUser = R.pipe(
    R.curry(getUser)(users),
    cloneObj);

//Get your very own Henry.
const getHenry = function() { return getUsersUser("Henry"); };

//
const updateHenry = R.pipe(
    R.curry(updateScore)(getHenry()),
    cloneObj,
    updateTries,
    R.curry(storeUser)(users));
