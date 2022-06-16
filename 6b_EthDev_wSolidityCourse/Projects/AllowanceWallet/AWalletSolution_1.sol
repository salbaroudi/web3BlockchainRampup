//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

/*Owner functionality and guards are in imported OZ template.
 This follows best practices, as is better than our few lines of owner logic.

Some other notes:
- Notice the use of internal and view to restrict our functions - not
everythign shoudl be accessable or public.
- We modified a modifier (from Ownable).

Conceptual Issue (Resolved):
- our allowances are numerical amounts that limit how much ether we can send.
- allowances aren't stores of Ether themselves.
- The ether comes from the Smart Contract (when a withdrawl occurs). Not the
allowance.
- When the "owner has no limits", this means that allowances don't draw down.
For regular users, they do draw down.


*/

contract SharedWallet is Ownable {
    //only used inside contract. This is why there is a return value.
    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }

    mapping(address => uint) public allowance;

    //check if owner is making transaction. Change accordingly.
    function addAllowance(address _who, uint _amount) public onlyOwner {
        allowance[_who] = _amount;
    }

    //Derived Modifier...check if owner OR if sender amount is below limit.
    modifier ownerOrAllowed(uint _amount) {
        require(isOwner() || allowance[msg.sender] >= _amount, "You are not allowed!");
        _;
    }

    //Only used inside contract. We can send arguments to modifiers (note below).
    function reduceAllowance(address _who, uint _amount) internal ownerOrAllowed(_amount) {
        allowance[_who] -= _amount;
    }

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowed(_amount) {
        require(_amount <= address(this).balance, "Contract doesn't own enough money");
        //So this is what the instructor meant...I was confused how this was to be implemented.
        if(!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }
        //We can only transfer what the smart contract has in balance.
        //But we can ignore the "allowance", which is not ETH, just a number.
        _to.transfer(_amount);
    }

    //Anyone can send money, and it will just go to the SC address OnChain.
    receive() external payable {

    }
}
