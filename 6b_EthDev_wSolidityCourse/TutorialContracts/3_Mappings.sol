//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SimpleMappingExample {

    //Note: we didn't malloc or set a length limit, like C or JS. These are dynamic arrays.
    mapping(uint => bool) public myMapping;
    mapping(address => bool) public myAddressMapping;

    //A Mapping of Mappings...
    mapping (uint => mapping(uint => bool)) uintUintBoolMapping;

    //Not public, so we made our own getter (not auto-generated).
    //Notice the view keyword - this signals a read-only function.
    //If a function returns, we must always write "return (types...) before the brace.
    function get2Mapping(uint _index1, uint _index2) public view returns (bool) {
        return uintUintBoolMapping[_index1][_index2];
    }

    //setter
    function set2Mapping(uint _index1, uint _index2, bool _value) public {
        uintUintBoolMapping[_index1][_index2] = _value;
    }


    function setValue(uint _index) public {
        myMapping[_index] = true;
    }

    //This will grab the address of the sender, and set it to true in our mapping.
    function setMyAddressToTrue() public {
        myAddressMapping[msg.sender] = true;
    }


}
