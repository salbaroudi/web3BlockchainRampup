pragma solidity ^0.5.16;

contract Election {

  //Model a candidate/Store Candidates
  //Fetch Candidates
  //Store Candidates
  //Store Candidates Count.

  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  //Note: This is a kind of enumeration of Candidates stored
  //On the blockchain! We can't know its size, so we keep
  //track with a state variable.
  mapping(uint => Candidate) public candidates;
  uint public candidatesCount;

  //Quick lookup to see who has voted. If address is not present, will return null (?)
  mapping(address => bool) public voters;



  string public candidate;

  //Constructor
  //Note: We can't use the Contract Name to signal constructor - deprecated.
  constructor () public {
    addCandidate("Name 1");
    addCandidate("Name 2");
  }


  //Add Candidates Function:
  function addCandidate (string memory _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  //understand variable scope/access: this function is called by the VOTER,
  //and Solidity gives us access to their metadata via msg.sender() function
  function vote (uint _candidateId) public {
    //Check that the address has not voted before.
    require(!voters[msg.sender]);
    //Check we are voting for a valid candidate.
    require(_candidateId > 0 && _candidateId <= candidatesCount);

    //Record that voter has voted.
    voters[msg.sender] = true;

    //update candidate vote count
    candidates[_candidateId].voteCount ++;
  }

}
