//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";

/*Owner functionality and guards are in imported OZ template.
 This follows best practices - it is better than our few ad hoc lines we come up with in 5 min.

Some other notes:
- Notice the use of internal and view to restrict our functions - not
everything shoudl be accessable or public.
- We modified a modifier (from Ownable).

Conceptual Issue (Resolved):
- our allowances are numerical amounts that limit how much ether we can send.
- allowances **aren't** stores of Ether themselves.
- The ether comes from the Smart Contract (when a withdrawl occurs). **Not** the
allowance.
- When the course lecturer says "owner has no limits", he means that allowances don't draw down when they send to
someone. For regular users, they *do* draw down.

*/

contract Allowance is Ownable {
    //To Used for reducing allowance (see below).
    using SafeMath for uint;

    //external events, so that other entities can be infomred when allowances change.
    //indexed: a keyword that allows us to search through a history of events, on the side-chain.
    event AllowanceChanged(address indexed _forWho, address indexed _byWhom, uint _oldAmount, uint _newAmount);
    //only used inside contract. This is why there is a return value.
    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }

    mapping(address => uint) public allowance;

    //check if owner is making transaction. Change accordingly.
    function addAllowance(address _who, uint _amount) public onlyOwner {
        emit AllowanceChanged(_who, msg.sender, allowance[_who], _amount);
        allowance[_who] = _amount;
    }

    //Derived Modifier...check if owner OR if sender amount is below limit.
    modifier ownerOrAllowed(uint _amount) {
        require(isOwner() || allowance[msg.sender] >= _amount, "You are not allowed!");
        _;
    }

    //Only used inside contract. We can send arguments to modifiers (note below).
    function reduceAllowance(address _who, uint _amount) internal ownerOrAllowed(_amount) {
        emit AllowanceChanged(_who, msg.sender, allowance[_who], allowance[_who].sub(_amount));
        allowance[_who] = allowance[_who].sub(_amount);
    }
}

contract SharedWallet is Allowance {
    event MoneySent(address indexed _beneficiary, uint _amount);
    event MoneyReceived(address indexed _from, uint _amount);

    //Comes with our Owner Super-Contract. We must override and neuter it.
     function renounceOwnership() public override onlyOwner {
        revert("cant renounceOwnership here. "); //not possible with this smart contract
    }

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowed(_amount) {
        require(_amount <= address(this).balance, "Contract doesn't own enough money");
        //So this is what the instructor meant...I was confused how this was to be implemented.
        if(!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }
        emit MoneySent(_to, _amount);
        //We can only transfer what the smart contract has in balance.
        //But we can ignore the "allowance", which is not ETH, just a number.
        _to.transfer(_amount);
    }

    //Anyone can send money, and it will just go to the SC address OnChain.
    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }
}
