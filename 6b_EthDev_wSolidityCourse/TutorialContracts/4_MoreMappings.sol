//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract MappingsStructExample {

    //Kept in the Balance Object, in a mapping
    //access fields with object dot notation.
    struct Payment {
        uint amount;
        uint timestamp;
    }

    //Keep an account total, number of payments, and log of Payments.
    struct Balance {
        uint totalBalance;
        uint numPayments; //our mappings have no bound/length. Need this as a key for each payment, in sequence.
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) public balanceReceived;

    //Recall that address(this) references the smart contract address itself.
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    //Standard send money function. to: field is the smart contract itself (default behaviour).
    function sendMoney() public payable {
        balanceReceived[msg.sender].totalBalance += msg.value;

        //Reference Struct. Don't forget memory keyword. Not put in a register.
        Payment memory payment = Payment(msg.value, block.timestamp);
        balanceReceived[msg.sender].payments[balanceReceived[msg.sender].numPayments] = payment;
        balanceReceived[msg.sender].numPayments++;
    }

    //unpack to address in arg header, and use .transfer() method of Address object to send.
    //No need for a require, as we have our mapping array to restrict funds.
    function withdrawAllMoney(address payable _to) public {
        uint balanceToSend = balanceReceived[msg.sender].totalBalance;
        balanceReceived[msg.sender].totalBalance = 0;
        _to.transfer(balanceToSend);
    }


    function withdrawMoney(address payable _to, uint _amount) public {
        require(balanceReceived[msg.sender].totalBalance >= _amount, "Insufficient Funds.");
        balanceReceived[msg.sender].totalBalance -= _amount;
        _to.transfer(_amount);
    }


    /*Re-entry Attack: The Checks-Effects-Interaction Pattern
        function withdrawAllMoney(address payable _to) public {
        _to.transfer(balanceReceived[msg.sender]);
        balanceReceived[msg.sender] = 0;
        }
        State is updated before transfer - so this code can't be run again (multiple withdrawls).
    */

}
