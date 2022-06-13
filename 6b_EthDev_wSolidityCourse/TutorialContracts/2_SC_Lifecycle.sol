// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

contract StartStopUpdateExample {

    //These restrict our calls - not everyone can perform a state change.
    address public owner;
    bool public paused;

    constructor() {
        owner = msg.sender;
    }

    //Only the owner can set a pause on the contract.
    function setPause(bool _paused) public {
        require(msg.sender == owner, "No soup for you");
        paused = _paused;
    }

    // Just here to load the contract with Ether.
    function sendMoney() public payable {
    }

    // If not paused, and owner is the _to address, then it executes.
    function withdrawAllMoney(address payable _to) public {
        require(owner == msg.sender, "No soup for you.");
        require(!paused, "Functionality Paused by owner. Come back later;");
        _to.transfer(address(this).balance);
    }

    //Similar to above, only owner can call this.
    //Note: In remix: it will still lie around the workspace, but will not function.
    function destroySmartContract(address payable _to) public {
        require(msg.sender == owner, "No soup for you.");
        selfdestruct(_to);
    }
}
