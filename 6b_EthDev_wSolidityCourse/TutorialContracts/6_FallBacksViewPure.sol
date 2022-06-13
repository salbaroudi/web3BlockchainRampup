//SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

contract FunctionsExample {

    mapping(address => uint) public balanceReceived;

    address payable owner;

    //this is not generated automatically.
    function getOwner() public view returns(address) {
        return owner;
    }

    //Any _amount < 1 eth would be a decimal, which is rounded to zero. A silly function.
    function convertWeiToEth(uint _amount) public pure returns(uint) {
        return _amount / 1 ether;
    }

    //We can parrot back a string with no cost! This is a "call" and not a transaction.
    //We don't interact with state, or change it at all so no ether cost.
    function HW(string memory _message) public pure returns(string memory) {
        return _message;
    }

    constructor () {
        owner = payable(msg.sender); //ensures that the address is payable?
    }

    function destroySmartContract() public {
        require(msg.sender == owner, "Not the Mama");
        selfdestruct(owner); //sends balance to owner.
    }

    function receiveMoney() public payable {
        assert(balanceReceived[msg.sender] + msg.value >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += msg.value;
    }

    function withdrawMoney(address payable _to, uint _amount) public {
        require(_amount <= balanceReceived[msg.sender], "not enough funds.");
        assert(balanceReceived[msg.sender] >= balanceReceived[msg.sender] - _amount);
        balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);
    }

    //If the function call is wrong, or we just send ETH with "Transact", this will add ether to our contract address.
    receive() external payable {
        receiveMoney();
    }

}
