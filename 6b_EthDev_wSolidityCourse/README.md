## Ethereum Development with Solidity: Section Notes:

### Section 1 & 2: Introduction:

#### Definitions:

- **Smart Contract:** Self-Executing agreements that consists of code which details the
conditions which must be met in order for it to execute.
- **Blockchain:** A distributed database that arranges records into a set of connected blocks.
It is designed to be tamper and revision resistant. New blocks are added to the chain via a network
consensus mechanism over a p2p network.
- **Proof of Work:** A consensus mechanism that uses easy to verify, hard to solve problems to encourage
honest actors to mine blocks for the chain. The network awards a lucky actor some cryptocurrency -
and keeping the network running ensures the actors's currency has value.

This mechanism has been proven to work for 10+ years (bitcoin) - however it has high energy usage as a consequence.

- **Proof of Stake:** An alternative consensus mechanism that uses large, exposed actors (who incur risk) as nodes
who verify transactions. Here, an actor stakes a large share of cryptocurrency on the network. They are disincentivised
from lying, as loss of reputation (of the network) will directly affect the price of their staked currency - leading
to financial ruin for the actors. Actors also generate small amounts of currency by verifying transactions.

This mechanism has not been well tested, but is much more energy efficient.

- The main innovations of Blockchain Technology is that it can alleviate the problem of centralized authority,
and solves the Double Spending Problem.


### Section 3: Transactions, Wallets & Hashing Step-by-Step:

- To access any blockchain (from a browser/desktop application), we need a blockchain node intermediary. These are applications like
Infura, Etherscan.io, etc.
- The blockchain is our distributed leger, and "source of truth".
- Eth Transactions fields: [from (addr), to (addr), value (wei), gas, gasPrice, data (ABI Byte String), nonce (int)]
- Anyone can send an Eth Transaction - so we use digital signatures to prove identity of the sender.
- Review of Crypography for Signing Transactions:
  - Private Key is a 256 bit (64 hex char) randomly generated number.
  - Public Key is derived by running Elliptic Curve Digital Signature Alg (ECDSA) on private key.
  - Eth Address is the Keccah Hash on the last 20 bytes of the private key.

  $$k_{private} \longrightarrow_{ECDSA} k_{public} \longrightarrow_{keccah20bytes} addr_{public}  $$

  - To sign a transaction, we use our transaction and private key. This generates a signed transaction with cryptography parameters
  **v,r,s**. We use these three parameters to rederive the Public Key. Because only the owner of the private key can genrate v,r,s, such
  that we can derive the public key, this is proof that the private key owner approved the transaction.

- A *Hashing Function* is one that takes a string input, and maps it to a bytes/bits digest output.
- Properties of a Hashing Function:

   a) Deterministic
   b) Small changes to input cause large changes to digest output (no obvious delta,epsilon bounding)
   c) Computationally Easy to generate digest. Computationally infeasible to calculate the inverse (map digest to input).
   d) Extremely low probability of two inputs causing a collision in the outputs.

- Hashing is used to make changing the blockchain computationally infeasible for malicous actors.
- We have a running hash for each block, that consists of:
   (i) The running hash of all previous blocks.
   (ii) Hashed with the current block, to produce an up-to-date hash.
- If a bad actor wishes to change historical blocks, they would have to control > 50% of the network, and also remine/rehash all of the blocks afterwards. Our block mining+running hash create Computational Infeasibility.
- The parent hash of the current block, is the hash of the previous block.

### Section 4: Learn Solidity Step-By-Step with Labs and Slides:

- For this course [Ethereum Remix IDE](http://remix.ethereum.org/) will be used.
- To deploy a smart contract on a Test Net, we have three options:

1) Javascript VM: This simulates a blockchain, and allows for transactions from our Remix console to be made. Data persistance is only as long as the Remix tab is open!
2) Injected Web3: Connect with Metamask, using Goerth or Ropsten networks. These are external testnets.
3) Web3/Ganache Provider: Using the Truffle suite of tools, this loads a desktop blockchain wiht 10 fEth accounts for testing.

- *Ganache vs Test Networks:* The former costs nothing and is good for unit testing. The latter is more-persistant, but is slower to deploy contracts. Start with Ganache for development, first.

- Smart Contract:
  - piece of code that runs on the Blockchain
    - code is stateful.
    - its functions are invoked via transactions.
    - can execute contract/business logic.
    - Solidity and Many SC languages are Turing complete.
    - High level language compiles to Eth Byte Code (and run in Node VMs).

- **All nodes** on the network that contain an official copy of the block-chain **must** independently run a SC transaction.
they must all agree on the final output for the transaction to go through!
