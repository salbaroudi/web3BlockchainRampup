
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

//const boostSingleScores = scores.map(val => (val < 10) ? val * 10 : val);

const multSingleScoresBy10 = _.map(val => (val < 10) ? val * 10 : val);

//const rmvOverScores = boostSingleScores.filter(val => val <= 100);

const rmvScoresOver100 = _.filter(val => val <= 100);

//const rmvZeroScores = rmvOverScores.filter(val => val > 0);

const rmvZeroScores = _.filter(val => val > 0);

//Convert each statement to a function that can accept and act on any array.

//Compose a function that will remove both zero or lower scores and scores over 100. Test it using the scores array.

const rmvBothZeroAndOver100 = _.pipe(
    rmvScoresOver100,
    rmvZeroScores);

//Compose a function that will do all the modifications to an array. Test it using the scores array.

const processScores = _.pipe(
    multSingleScoresBy10,
    rmvBothZeroAndOver100);

//Create a function that will accept an array and return the average.

const computeAverage = _.curry(_.mean);

//Compose a function that will do all the modifications on an array and return an average.  

const processAndComputeAve = _.pipe(
    processScores,
    computeAverage);

