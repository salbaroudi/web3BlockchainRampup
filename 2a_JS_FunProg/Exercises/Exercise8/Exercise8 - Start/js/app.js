
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

const boostSingleScores = scores.map(val => (val < 10) ? val * 10 : val);

const rmvOverScores = boostSingleScores.filter(val => val <= 100);

const rmvZeroScores = rmvOverScores.filter(val => val > 0);

//Convert each statement to a function that can accept and act on any array.
const lodashBSS = _.map(val => (val < 10) ? val * 10 : val);
const lodashROS = _.filter(val => val <= 100);
const lodashRZS = _.filter(val => val > 0);

//Compose a function that will remove both zero or lower scores and scores over 100. Test it using the scores array.
const lodashRmvZeroHund = _.flow(lodashROS, lodashRZS);


//Compose a function that will do all the modifications to an array. Test it using the scores array.
const doAll = _.flow(lodashBSS, lodashROS, lodashRZS);


//Create a function that will accept an array and return the average.
//Correction: Use an arrow function - less writing
const calcAverage = (arr) => _.mean(arr);

//Compose a function that will do all the modifications on an array and return an average.
const doEvenMore = _.flow(lodashBSS, lodashROS, lodashRZS, calcAverage);
