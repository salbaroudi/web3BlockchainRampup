
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

const singleScoresByTen = function(arry) {
    return arry.map(val => (val < 10) ? val * 10 : val);
};

const rmvOverScores = function(arry) {
    return arry.filter(val => val <= 100);
};

const rmvZeroScores = function(arry) {
    return arry.filter(val => val > 0);
};

const sumScores = function(arry) {
    return arry.reduce((sum, val) => sum + val, 0);
};

const countScores = function(arry) {
    return arry.reduce((cnt, val) => cnt + 1, 0);
};

//Convert each statement to a function that can accept and act on any array.

//Compose a function that will remove both zero or lower scores and scores over 100. Test it using the scores array.
const rmvBothHighLow = pipe(
    rmvOverScores,
    rmvZeroScores);

const noHighLowArray = rmvBothHighLow(scores);

//Compose a function that will do all the modifications to an array. Test it using the scores array.

const prepareScores = pipe(
    rmvBothHighLow,
    singleScoresByTen);

const preparedArray = prepareScores(scores);

//Create a function that will accept an array and return the average. Use the function that sums scores and the function that counts scores or the length property.
const computeAverage = function(arry) {
    return sumScores(arry) / arry.length;
};

//Compose a function that will prepare an array and return an average.

const prepareAndComputeAve = pipe (
    prepareScores,
    computeAverage);

const ave = prepareAndComputeAve(scores);
