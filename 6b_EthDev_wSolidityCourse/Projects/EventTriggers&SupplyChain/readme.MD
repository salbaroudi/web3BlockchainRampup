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
