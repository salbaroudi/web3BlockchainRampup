let Web3 = require("web3");

//Lets look at the Web3 import
console.log(Web3);

//this gives us a connection. Note the lower case.
let w3conn = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"))


//This returns a promise. Lets resolve it!
//Note: I am using the first two addreses from default Ganache session. You might need to
//change the addresses if they generate differently.
console.log("Our Ether Balance:")
w3conn.eth.getBalance("0x413453B27BFEA093ad3F80632D9d3a103988C2eD")
.then(function(result) {console.log(w3conn.utils.fromWei(result,"ether"))} );


//Lets send a transaction:
//Send from Ganache Address 2 to Address 1
//Go to Ganache Application and verify it sent.
w3conn.eth.sendTransaction({from: "0x9272bc763185ffa1777fF4064AA5332d48b567D2",
to:"0x413453B27BFEA093ad3F80632D9d3a103988C2eD",value: w3conn.utils.toWei("5", "ether")})
.then(console.log);
