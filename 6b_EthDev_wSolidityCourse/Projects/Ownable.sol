pragma solidity ^0.6.0;

contract Ownable {
    address public _owner;

    //Only the person that launched the set of smart contracts can be owner.
    //Adds some security, to stop ItemManager being tampered with, or items being taken.
     constructor () internal {
        _owner = msg.sender;
    }

    /**
    * @dev Throws if called by any account other than the owner.
    */
    //Block non-owners from interacting with the ItemManager.
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }
    /**
    * @dev Returns true if the caller is the current owner.
    */
    //Anyone can see who is the current owner.
    function isOwner() public view returns (bool) {
       return (msg.sender == _owner);
    }
}
