//SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

//We have separated the ownership functionality, and tokenomics.
contract Owned {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    //Eliminate redundant checks in each function, with functional modifiers.
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the Mama");
        _;
    }
}


//This contract just focuses on the tokenomics - ownership and modifiers kept above.
contract InheritanceModifierExample is Owned {

    mapping(address => uint) public tokenBalance;

    uint tokenPrice = 1 ether;

    constructor() { //we didnt call Super() for above?
        tokenBalance[owner] = 100; //owner gives itself 100 tokens.
    }


    //The pool for new tokens is the owners address. Sketchy.
    function createNewToken() public onlyOwner {
        tokenBalance[owner]++;
    }

    //if we want to burn the pool, we burn from the owner address. Sketchy.
    function burnToken() public onlyOwner {
        tokenBalance[owner]--;
    }

    function purchaseToken() public payable {
        //stops negative token count.
        require((tokenBalance[owner] * tokenPrice) / msg.value > 0, "not enough tokens");
        tokenBalance[owner] -= msg.value / tokenPrice; //if they don't give us enough money, always rounds to zero!
        tokenBalance[msg.sender] += msg.value / tokenPrice; //likewise no change here. Decimal point side-effect.
    }

    function sendToken(address _to, uint _amount) public {
        require(tokenBalance[msg.sender] >= _amount, "Not enough tokens");
        assert(tokenBalance[_to] + _amount >= tokenBalance[_to]); //stop zero/negative values.
        assert(tokenBalance[msg.sender] - _amount <= tokenBalance[msg.sender]); //stop negative draws.
        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;
    }
}
