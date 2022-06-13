//SPDX-License-Idenfitier: MIT

pragma solidity 0.8.4;

//Born to fail. This will deploy, and not give any message when it auto-runs
contract WillThrow {
    function aFunction() public {
        require(false, "Error message");
    }
}

//When we add this sub-contract, we are able to read the error message.
contract ErrorHandling {
    event ErrorLogging(string reason);
    function catchError() public {
        WillThrow will = new WillThrow();
        try will.aFunction() {
            //here we could do something if it works
        }  catch Error(string memory reason) {
            emit ErrorLogging(reason);
        }
    }
}
