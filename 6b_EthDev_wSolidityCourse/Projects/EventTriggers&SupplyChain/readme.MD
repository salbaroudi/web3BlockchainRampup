## Events & Supply Chain Project:

### Setup:

This project requires node v12.X and truffle v5.1.8 to run. We need to download legacy versions to continue with this project.

1) On Command Line, switch to a legacy node version using nvm: *nvm use lts/erbium*


To go back to normal node, type "use default".

2) Install legacy truffle with: *npm i truffle@5.1.8*


3) Since we did not install truffle globally, we need to run the module wiht npx. Create a new folder called "project", enter it, and run: *npx truffle unbox react*

### General Notes:

- Truffle does not come with any front-end; we need jQuery or react for this part.
- Truffle is made to manage/help develop our back-end connection to the blockchain. It is a suite of tools, including Ganache for blockchain simulation + test.
- Even as of now, Truffle does not support Node 18. Downgrade to Node 16 to get the framework to compile correctly.

- **Migrations:**

  - A Migration is an additional smart contract that takes care of application changes over time (as it develops).

  - for the artifacts.require() function, just give the contract classname. Do not use a path.

    - Artifacts are placed in the build folder, and are JSON files with functional descriptions, as well as raw ByteCode.

  - Migration .js files are prefixed with numbers, and ran in that order.

  - If a set of previous migration files was successful, truffle will just run the latest file.

  - Migration information is stored on a side-chain - blockchain records history.


- **Testing:**

  - we can form testing files with Solidity or javascript.
  - The its() library is commonly used to form tests in JS.

#Basic Truffle Commands:

Start a new project: *truffle init*.

Test a smart contract: *truffle test ./test/TesterContract.sol*

Compile contracts (and produce build Artifacts): *truffle compile*

Use a basic unboxed project to start: *truffle unbox pet-shop*
