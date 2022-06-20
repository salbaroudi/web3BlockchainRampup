## Web3js Project Notes:

### Use Web3js to send Ether to different accounts:
### Use Web3js to Interact with Smart Contracts:

- Connect Remix to Ganache, and use command line scripts to interact with our running SC in Remix - Ganache is our
local blockchain


### Use Web3js with Chrome:

- We use web3-js-browser module in node to run all our backend in the front end. All queries can be typed into our JS Inspection console.

### Behind the Scenes with Web3JS:
- Recall that we need to connect to a blockchain node to access/mutate the blockchain itself. We typically have three
technologies to connect with:

  1) **Remote Procedure Call:** These are done with HTTP/HTTPS requests to server. We have to request a new connection everytime.

  2) **Inter Process Communication (Pipe):** Often done on local networks or on the same machine, these connect with an
  internal address and port number - data is sent through a special file. Connection is persistent.

  3) **Web Sockets: External IPCs** - connecting to a server outside with a port number. Connection is persistent.

- The general idea for all of our future projects: Use Node web3 libraries, run them in Chrome/Firefox browser, and use
different connection methods to query/write data to Blockchain nodes.

- Some Common Web3JS sub-modules:

  - Eth: for interacting with Ethereum Blockchain.

  - Net: deals with networking properties and settings.

  - Personal: Interaction with Ethereum Accounts (EOAs)

  - Shh: dealing with the Whisper network.

  - Bzz: dealing with the swarm network (nodes).

  - utils: common functions for getting things done, such as Wei to Ether converter.
