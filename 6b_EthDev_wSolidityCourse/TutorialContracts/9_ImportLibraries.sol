pragma solidity ^0.5.13;
import "https://github.com/OpenZeppelin/openzeppelincontracts/contracts/math/SafeMath.sol";

//Notice that you can import libraries from github - similar to using CDNs for Node.js.

contract LibrariesExample {

//This is how we import our library for usage.
//No Namespace prefix, just use functions directly on any object with the given type.
using SafeMath for uint;

 mapping(address => uint) public tokenBalance;

 constructor() public {
 tokenBalance[msg.sender] = tokenBalance[msg.sender].add(1);
 }

 function sendToken(address _to, uint _amount) public returns(bool) {
 tokenBalance[msg.sender] = tokenBalance[msg.sender].sub(_amount);
 tokenBalance[_to] = tokenBalance[_to].add(_amount);

 return true;
 }
}
