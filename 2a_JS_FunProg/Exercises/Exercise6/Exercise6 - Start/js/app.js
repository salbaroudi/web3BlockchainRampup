
const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

/* For Reference.
const boostSingleScores = scores.map(val => (val < 10) ? val * 10 : val);

const rmvOverScores = boostSingleScores.filter(val => val <= 100);

const rmvZeroScores = rmvOverScores.filter(val => val > 0);

const scoresSum = rmvZeroScores.reduce((sum, val) => sum + val, 0);

const scoresCnt = rmvZeroScores.reduce((cnt, val) => cnt + 1, 0);
*/

// 1
//Convert each statement to a function that can accept and act on any array.
const boostSingleScores = function(arr) {
  return arr.map(val => (val < 10) ? val * 10 : val);
};

const rmvOverScores = function(arr) {
  return arr.filter(val => val <= 100);
};

const rmvZeroScores = function(arr) {
  return arr.filter(val => val > 0);
};

const scoresSum = function(arr) {
  return arr.reduce((sum, val) => sum + val, 0);
};

const scoresCnt = function(arr) {
  return arr.reduce((cnt, val) => cnt + 1, 0);
};


// 2
//Compose a function that will remove both zero or lower scores and scores over 100. Test it using the scores array.
//Note: Not sure what "lower scores" exactly refers to here. Will construct a call that removes zero and scores over 100.

//FC = "Function Calls"
const dropExtremesFC = pipe(rmvOverScores, rmvZeroScores);
//R = "Result"
const dropExtremesR = dropExtremesFC(scores);

// 3
//Compose a function that will do all the modifications to an array. Test it using the scores array.

const allCallsFC = pipe(boostSingleScores, dropExtremesFC);
const allCallsR = allCallsFC(scores);

// 4
//Create a function that will accept an array and return the average. Use the function that sums scores and the function that counts scores or the length property.
//You can just call functions inside other functions. Stop using the pipe construct!

const computeAverage = function(arr) {
  return scoresSum(arr) / scoresCnt(arr);
}

// 5
//Compose a function that will do all the modifications on an array and return an average.
const doAllFC = pipe(allCallsFC,computeAverage);

const doAllR = doAllFC(scores);
