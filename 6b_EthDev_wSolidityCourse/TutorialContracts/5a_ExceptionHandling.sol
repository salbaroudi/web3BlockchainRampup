//SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

//In this example, we deliberately use smaller ints to get overflow/underflow effects.
//We have assert statements to check critical program invariants - such as transactions that will underflow
//our uint64.

contract ExceptionExample {

    //Keep track of who donates - standard pattern.
    mapping(address => uint64) public balanceReceived;

    function receiveMoney() public payable {
        assert(msg.value == uint64(msg.value));
        balanceReceived[msg.sender] += uint64(msg.value);
        assert(balanceReceived[msg.sender] >= uint64(msg.value));
    }

    //Motivation: No userfeedback in its current form. Transaction will succeed in console even if we overdraw.
    function withdrawMoney(address payable _to, uint64 _amount) public {
       require(_amount <= balanceReceived[msg.sender], "Not Enough Funds, aborting");
       assert(balanceReceived[msg.sender] >= balanceReceived[msg.sender] - _amount);
       balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);

    }
}
