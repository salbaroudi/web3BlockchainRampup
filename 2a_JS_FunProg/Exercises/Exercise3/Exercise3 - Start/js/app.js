
//For this exercise, we are supposed to feed each array result into the next
//RMF function. They are chained manually.

const scores = [50, 6, 100, 0, 10, 75, 8, 60, 90, 80, 0, 30, 110];

//Any scores that are below 10 needs to be multiplied by 10 and the new value included.
const scores1 = scores.map(function(val) {
  var result = val;
  if (val < 10){
    result = val*10
  }
  return result;
});

//Remove any scores that are over 100.
const scores2 = scores1.filter(function(val) {
  return (val<100);
});

//Remove any scores that are 0 or below.
const scores3 = scores2.filter(function(val) {
  return (val>0);
});


//Sum the scores.
let totalScores = scores3.reduce(function(accumulator, elem) {
  return accumulator + elem;
}, 0);


//Provide a count for the number of scores still remaining.
let scoreTally = scores3.reduce(function(accumulator, elem) {
  return accumulator + 1;
}, 0);
