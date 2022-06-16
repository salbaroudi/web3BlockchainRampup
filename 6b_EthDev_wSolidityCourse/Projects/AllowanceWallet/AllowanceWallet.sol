//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AllowanceWallet {

    mapping(address => uint) public allowances;
    address payable owner;

    constructor () {
        owner = payable(msg.sender);
    }

    //Also use this to update a user's given allowance. They will draw it down\
    //Until they are reset again.
    function changeAllowance(address payable _to, uint _amount) public {
        require(owner == msg.sender, "Only the owner is permitted to adjust allowances.");
        require(_to != owner, "Allowances for thee, not for me.")
        require(_amount >= 0, "You cannot allow negative or zero values.");
        allowances[_to] = _amount;
    }

}
