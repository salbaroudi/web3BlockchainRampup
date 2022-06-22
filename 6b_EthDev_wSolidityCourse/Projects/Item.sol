pragma solidity ^0.6.0;

import "./ItemManager.sol";

contract Item {
    uint public pricePaid;
    uint public priceInWei;
    uint public index;

    ItemManager parentContract; //Item is in Item Manager, but this is a link back.

    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) public {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    //Fallback function.
    receive() external payable {
        //This is NOT recommended. If a payment with no message body sent, how do we move item to next stage? Which item was bought?
        //We only use 2100 gas by default, which may not be enough to make any additional changes to ItemManager anyways.
        //address(parentContract).transfer(msg.value);
        //Instead, we use a low-level function ot get more gas. (NOTE: It will not throw errors!)
        //WE need to do our own Bytes4(sha3(function signature)) hashing to invoke the triggerPayment function!
        //Call gives back two variables: 1) A Boolean for success/fail, and 2) Other return values from function body.
        require(pricePaid == 0, "Item is paid "); //zero indicates it has been initialized only.
        require(priceInWei <= msg.value, "No short-changing."); //my modification: they can overpay if they want.
        pricePaid+= msg.value;
        (bool success, ) = address(parentContract).call{value:msg.value}(abi.encodeWithSignature("triggerPayment(uint256)",index));
        require(success, "The transaction wasn't successful, aborting...");
    }

    //Interestingly: For the user to send payment to the Item Contract address, to "pay" for it. We need to use low-level interactions and a
    //legacy fallback function. User Sends 1000 Wei, and the trigger payment function gets called in receive().
    fallback () external {}
}
