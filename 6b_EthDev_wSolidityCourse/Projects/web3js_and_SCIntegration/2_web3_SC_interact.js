const Web3 = require("web3");

//First lets interact by looking at the call hash from Remix:
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.call({from:"0x413453B27BFEA093ad3F80632D9d3a103988C2eD",
to:"0xd271236cdc097B32D788AB120767f8a41A2478cB", data:"0x06540f7e"}).then(console.log);


//Lets show that Bytes4(sha3(<function signature>)) gives the same result:
//First get the hash itself:
const ourHash = web3.utils.sha3("myUint()");
console.log("Full Hash:" + ourHash);
const fourByteHash = ourHash.substr(0,10);
console.log("4Byte Hash:" + fourByteHash);

//Call again with our calculated hash:
web3.eth.call({from:"0x413453B27BFEA093ad3F80632D9d3a103988C2eD",
to:"0xd271236cdc097B32D788AB120767f8a41A2478cB", data:fourByteHash}).then(console.log);

//How do we interact with ABI directly, without making a prior call to fetch it?
//We can interact with the contract in browser, and copy is ABI from Etherscan or from Remix.
//We then load it into our script manually.
var myContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_myUint",
				"type": "uint256"
			}
		],
		"name": "setUint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
],"0xd271236cdc097B32D788AB120767f8a41A2478cB");

//Now lets call it!

myContract.methods.myUint().call().then(console.log).catch(console.error);

//Finally, lets set call our setUInt function and send an update value:
myContract.methods.setUint(500).send({from:"0x413453B27BFEA093ad3F80632D9d3a103988C2eD"}).then(result => {console.log(result);
myContract.methods.myUint().call().then(console.log);}).catch(console.error);
