pragma solidity ^0.5.14;

//Simple contract so we have an exposed ABI for web3.
contract SomeContract {
    uint public myUint = 10;
    function setUint(uint _myUint) public {
        myUint = _myUint;
    }
}
