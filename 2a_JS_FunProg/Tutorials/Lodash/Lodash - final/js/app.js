//Use the CDN links to embed the Lodash script. Use the full version for simplicity.
//We access the library of lodash functions with the underscore operator
let sum = _.add(5,2);
//let sum2 = fp.add(5);
let sum3 = _.add(5);

console.log(sum);

//console.log(sum2(2));

console.log(sum3(2));

//Our map function is accessed from the top level library (underscore)
//Notice that our map function is not a method of arrays, like in native JS.
//Also notice that our map function takes in the array, it is not called on the array!
const addOne = _.map((num) => num + 1);
const multByThree = _.map((num) => num * 3);
//We can still use in arrow functions, like we do natively.
const removeNumsOver100 = _.filter((num) => num <= 100);

//Unavoidable side-effects.
const logAndReturn = function(data) {
    console.log(data);
    return data;
};
//Notice the initialization of the accumulator variable (sum), using invoke notation at the end.
const sumAllNumbers = _.reduce((sum, num) => sum + num)(0);//<-----

const processNumbers = _.flow(//Pipe is flow and Compose is flowRight!!
    addOne,
    multByThree,
    removeNumsOver100,
    logAndReturn,
    sumAllNumbers,
    console.log);

processNumbers([5, 8, 20, 40]);
