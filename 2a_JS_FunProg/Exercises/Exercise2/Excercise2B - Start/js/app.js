/*
  In this example, we make mega-functions that also include accessing and modifying
  the record.

  The instructor asks that we do not modify the users database for this exercise,
  so we just leave the newArray1 and 2 variables as they are.

*/


var users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

//Signature: Object -> Object
//Purpose: Perform a deep copy of an object located at a given pointer, and return that copy.
let cloneArr = function(copyObj) {
  return JSON.parse(JSON.stringify(copyObj));
};

var newScore = function(arr, name, amt) {
    dCArr = cloneArr(arr); //Modification
    dCArr.forEach(function(val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            val.score = val.score + amt;
        }
    });

    return dCArr;
};

var newTries = function(arr, name) {
    dCArr = cloneArr(arr); //Modification
    dCArr.forEach(function(val) {
        if (val.name.toLowerCase() === name.toLowerCase()) {
            val.tries++;
        }
    });
    return dCArr;
};

var newArray1 = newScore(users, "Henry", 30);
var newArray2 = newTries(users, "Henry");
