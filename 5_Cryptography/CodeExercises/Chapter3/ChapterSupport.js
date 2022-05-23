
//Permutation Function (for the P Permutation in the f-Function)
//Interpretation: We can just make a 1-D array. 8 x 4 array
//in the book was done for nicer formatting.
let pPerm = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,
14,32,27,3,9,19,13,30,6,22,11,4,25];

//Test p Permutation [1]
//Kind of a silly example, as the output will just be pPerm.
let testSeries = [...Array(32).keys()].map(x => ++x);
let newArr = [];
//Note! i is the key, NOT the value of the array (!!).
for (let i in testSeries) {
  newArr.push( testSeries[ pPerm[i]-1 ]);
}
//It works, make a function to call:


let pPermutation = function(opArr) {
  let permutedArray = [];
  let pPermArr = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,
  14,32,27,3,9,19,13,30,6,22,11,4,25];

  //Simple Check:
  if (opArr.length != 32) {
    throw "ERROR: S-Box Output Array is not of length 32. Check your input."
  }

  for (let i in opArr) {
    permutedArray.push( opArr[ pPermArr[i]-1 ]);
  }
  return permutedArray;
}

//Question 3.3: Rearrange the S-Box outputs.
let sBox33Output = [1,1,1,0,1,1,1,1,1,0,1,0,0,1,1,1,
  0,0,1,0,1,1,0,0,0,1,0,0,1,1,0,1];

let SBox33Perm = pPermutation(sBox33Output);


let SBox35Output = [0,0,1,1,1,1,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,
  1,0,0,0,1,0,0,0,0,0,1]

let SBox35Perm = pPermutation(SBox35Output);






/*References:

[1]: Audwin Oyong's Answer: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n

*/
