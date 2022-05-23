
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

//Note that we swapped the arguments so we could bind correctly.
var updateScore = function(newAmt,user) {
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

//Here, we use our pipe function and the new "bind" feature to set up
//unary functional calls. This allows us to pipe without issues.


/*
const usr = getUser(users, "Henry");
const usr1 = updateScore(cloneObj(usr), 30);
const usr2 = updateTries(cloneObj(usr1));
const newArray = storeUser(users, usr2);
*/


//first lets bind on the 2-ary functions (getUser and updateScore):
const partGetUser = getUser.bind(null, users);
const partUpdateScore = updateScore.bind(null,30);



//Generate the pipe. //Note that we need to call cloneObj to avoid Object clobbering.
const updateUser = pipe(partGetUser, cloneObj, partUpdateScore, updateTries);
//This returns a partially loaded function, which we will complete with a user name later.

//Now lets do our call:
const newestUser = updateUser("Henry");
