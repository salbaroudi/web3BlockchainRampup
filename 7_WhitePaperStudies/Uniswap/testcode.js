
var ethPool = 10;
var tokenPool = 500;
const drawMaxEth = 0.5;
const drawMaxToken = 50;
const invariant = ethPool*tokenPool;

let ethToToken = function(ethIn) {
  let fee = ethIn / 500;
  let newEthPool = ethPool + ethIn;
  let newTokenPool = invariant / (newEthPool - fee);
  let tokensOut = tokenPool - newTokenPool;
  ethPool = newEthPool;
  tokenPool = newTokenPool;
  return tokensOut;
}

let tokenToEth = function(tokensIn) {
  let fee = tokensIn / 500;
  let newTokenPool = tokenPool + tokensIn;
  let newEthPool = invariant / (newTokenPool - fee);
  let ethOut = ethPool - newEthPool;
  ethPool = newEthPool;
  tokenPool = newTokenPool;
  return ethOut;
}

// both draw functions reset the eth Pool after its simulation
// Result: When we run these functions repeatedly, we see the exchange rate go up for the token being received.
// Appears hyperbolic as expected.
let testDrawEth = function(draws=10) {
  let testValArr = new Array(draws).fill(Math.random()*drawMaxEth);
  console.log("Start Pool:: EthPool: " + ethPool + ", tokenPool: " + tokenPool);
  for (let dV in testValArr) {
    var hold = ethToToken(testValArr[dV]);
    console.log("i = " + dV + ", EthPool: " + ethPool + ", tokenPool: " + tokenPool + " , ExchangeRate:" + (ethPool/tokenPool));
  }
  ethPool = 10; tokenPool = 500;
}

let testDrawToken = function(draws=10) {
  let testValArr = new Array(draws).fill(Math.random()*drawMaxToken);
  console.log("Start Pool:: EthPool: " + ethPool + ", tokenPool: " + tokenPool);
  for (let dV in testValArr) {
    var hold = tokenToEth(testValArr[dV]);
    console.log("i = " + dV + ", EthPool: " + ethPool + ", tokenPool: " + tokenPool + " , ExchangeRate:" + (tokenPool/ethPool));
  }
  ethPool = 10; tokenPool = 500;
}
