
const users = [{name: "James",score: 30,tries: 1}, {name: "Mary", score: 110,tries: 4}, {name: "Henry",score: 80,tries: 3}];

const storeUser = (arr, user) => R.map(val => R.eqBy(R.toLower, val.name, user.name) ? user : val, arr);

const getUser = function(arr, name) {
    return R.reduce((obj, val) => R.eqBy(R.toLower, val.name, name) ? R.clone(val) : obj, null, arr);
};

const updateScore = (user, newAmt) => R.assoc("score", user.score + newAmt, user);

const updateTries = user => R.assoc("tries", user.tries + 1, user);

const getUsersUser = R.curry(getUser)(users);

const getHenry = () => getUsersUser("Henry");

const updateHenry = R.pipe(
    R.curry(updateScore)(getHenry()),
    updateTries,
    R.curry(storeUser)(users));

/*
Refactor the code to use the Ramda library. There are multiple places that could be modify to use Ramda.
*/






