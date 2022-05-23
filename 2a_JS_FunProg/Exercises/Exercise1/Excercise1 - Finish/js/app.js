
var users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

//Mutable Functions
var recordData = function(arr, prop) {
    users.forEach(function(val, i, a) {
        if (val.name.toLowerCase() === arr[0].toLowerCase()) {
            a[i][prop] = arr[1];
        }
    });
};

//Pure Functions
var getScore = function(arr, name) {
    let score;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === name.toLowerCase()) {
            score = arr[i].score;
            break;
        }
    };
    return [name, score];
};

var getTries = function(arr, name) {
    let tries;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.toLowerCase() === name.toLowerCase()) {
            tries = arr[i].tries;
            break;
        }
    };
    return [name, tries];
};

var updateScore = function(arr, amt) {
    let newAmt = arr[1] + amt;
    return [arr[0], newAmt];
};

var updateTries = function(arr) {
    let newTries = arr[1] + 1;
    return [arr[0], newTries];
};

let newScore = updateScore(getScore(users, "Henry"), 30);
recordData(newScore, "score");
recordData(updateTries(getTries(users, "Henry")),"tries");

