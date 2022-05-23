

const doubleNum = function(num) {
    return num + num;
};

const totalIt = function(n1, n2, n3, n4) {
    return n1 + n2 + n3 + n4;
};

const doArray = function(num1, num2) {
    return [num1, num2];
};

//In this tutorial we step through the curry function, to get a better idea on how it works.

//Run Browser console logging on the two following examples:

//Example1:
//We don't return nextCurried, because it was immediately invoked with ([]);
//The inner function "curried" was defined but not invoked, so thats what we get.
//2 levels of closure occur.
const curriedTotalIt = curry(totalIt);

//If we call the above function we are handed the curried intermediate function with
//the prevArgs and nextArgs arrays in various intermediate states. They populate
//as we sequentially fill in the arguments.

const curriedDoArray = curry(doArray);

/*const newFunction = pipe(
    doubleNum,
    curriedTotalIt(3)(2)(1),
    curriedDoArray(50));*/
