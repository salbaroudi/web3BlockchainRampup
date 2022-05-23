
var currentUser = 0,
    users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4},
    {name: "Henry",score: 80,tries: 3}];

//Not Pure: References and changes things outside function scope
var updateScore = function(newAmt) {
    users[currentUser].score += newAmt;
};

//Not Pure: refernces something outside of function scope.
var returnUsers = function() {
    return users;
};

//Not Pure: ref and change things outside of function scope.
var updateTries = function() {
    users[currentUser].tries++;
};

//Not Pure: ref and change things outside of function scope.
var updateUser = function(newUser) {
    currentUser = newUser;
};
