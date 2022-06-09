// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

contract SendMoneyExample {

    //Solidity will autogenerate a getter for this.
    uint public balanceReceived;
    uint public lockedUntil;

    //msg is an implict object that appears when a transaction is made, and contract fires.
    //it contains information from the meta-fields of the transaction.
    function receiveMoney() public payable {
        balanceReceived += msg.value;
        lockedUntil = block.timestamp + 10 seconds;
    }

    //view keyword: read-only.
    //address(this): get smart contract address from its object instance.
    //all addresses have a .balance field.
    function getBalance() public view returns(uint) {
        return address(this).balance;

    }

    //all funds in SC will be sent to whoever calls this function.
    //what does payable mean??
    function withdrawBalance() public {
        if(lockedUntil < block.timestamp) {
            address payable to = payable(msg.sender);
            to.transfer(getBalance());
        }
    }

    //My Attempt - it worked!
    /*
    function sendBalanceTo(address addr) public {
        address payable to = payable(addr);
        to.transfer(getBalance());
    }
    */

    // More terse code - can unpack address in functional header.
     function withdrawMoneyTo(address payable _to) public {
          if(lockedUntil < block.timestamp) {
            _to.transfer(getBalance());
          }
    }

}
