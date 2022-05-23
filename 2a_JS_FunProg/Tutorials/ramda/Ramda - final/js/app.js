
const addOne = R.map((num) => num + 1);
const multByThree = R.map((num) => num * 3);
const removeNumsOver100 = R.filter((num) => num <= 100);
const logAndReturn = function(data) {
    console.log(data);
    return data;
};
const sumAllNumbers = R.reduce((sum, num) => sum + num)(0);

const processNumbers = R.pipe(
    addOne,
    multByThree,
    removeNumsOver100,
    logAndReturn,
    sumAllNumbers,
    console.log);