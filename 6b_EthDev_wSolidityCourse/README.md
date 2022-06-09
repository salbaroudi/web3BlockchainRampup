## Ethereum Development with Solidity: Section Notes:

### Section 1 & 2: Introduction:

#### Definitions:

- **Smart Contract:** Self-Executing agreements that specify conditions which must be met in order for actions to occur.
- **Blockchain:** A distributed database that arranges records into a set of connected blocks.
It is designed to be tamper and revision resistant. New blocks are added to the chain via a network
consensus mechanism over a p2p network.
- **Proof of Work:** A consensus mechanism that uses easy to verify, hard to solve problems to encourage
honest actors to mine blocks for the chain. The network awards a lucky actor some cryptocurrency -
and keeping the network running ensures the actors's currency has value. This mechanism has been proven to work for 10+ years (bitcoin) - however it has high energy usage as a consequence.

- **Proof of Stake:** An alternative consensus mechanism that uses large, exposed actors (who incur risk) as nodes
who verify transactions. Here, an actor stakes a large share of cryptocurrency on the network. They are disincentivised
from lying, as loss of reputation (of the network) will directly affect the price of their staked currency - leading
to financial ruin for the actors. Actors also generate small amounts of currency by verifying transactions. This mechanism has not been well tested, but is much more energy efficient.

- The main innovations of Blockchain Technology is that it can alleviate the problem of centralized authority,
and solves the Double Spending Problem.


### Section 3: Transactions, Wallets & Hashing Step-by-Step:

- To access any blockchain (from a browser/desktop application), we need a blockchain node intermediary. These are applications like
Infura, Etherscan.io, etc.
- Eth Transactions fields: **[from (addr), to (addr), value (wei), gas, gasPrice, data (ABI Byte String), nonce (int)]**
- Anyone can send an Eth Transaction - so we use digital signatures to prove identity of the sender.
- Review of Cryptography for Signing Transactions:
  - Private Key is a 256 bit (64 hex char) randomly generated number.
  - Public Key is derived by running Elliptic Curve Digital Signature Alg (ECDSA) on private key.
  - Eth Address is the Keccah Hash on the last 20 bytes of the private key.

  $$k_{private} \longrightarrow[ECDSA] k_{public} \longrightarrow[keccah20bytes] addr_{public}  $$

  - To sign a transaction, we use our transaction and private key. This generates a signed transaction with cryptography parameters
  **v,r,s**. We use these three parameters to rederive the Public Key. Because only the owner of the private key can genrate v,r,s, such
  that we can derive the public key, this is proof that the private key owner approved the transaction.

- A *Hashing Function* is one that takes a string input, and maps it to a bytes/bits digest output.
- Properties of a Hashing Function:

   (a) Deterministic
   (b) Small changes to input cause large changes to digest output (no obvious delta,epsilon bounding)
   (c) Computationally Easy to generate digest. Computationally infeasible to calculate the inverse (map digest to input).
   (d) Extremely low probability of two inputs causing a collision in the outputs.

- We have a running hash for each block, that consists of:
   (i) The running hash of all previous blocks.
   (ii) Hashed with the current block, to produce an up-to-date hash.
- If a bad actor wishes to change historical blocks, they would have to control > 50% of the network, and also re-mine/rehash all of the blocks afterwards. Our block mining+running hash create Computational Infeasibility.
- The parent hash of the current block, is the hash of the previous block.

### Section 4: Learn Solidity Step-By-Step with Labs and Slides:

- For this course [Ethereum Remix IDE](http://remix.ethereum.org/) will be used.
- To deploy a smart contract on a Test Net, we have three options:

1) Javascript VM: This simulates a blockchain, and allows for transactions from our Remix console to be made. Data persistance is only as long as the Remix tab is open!
2) Injected Web3: Connect with Metamask, using Goerth or Ropsten networks. These are external testnets.
3) Web3/Ganache Provider: Using the Truffle suite of tools, this loads a desktop blockchain with 10 fEth accounts for testing.

- *Ganache vs Test Networks:* The former costs nothing and is good for unit testing. The latter is more-persistant, but is slower to deploy contracts. Start with Ganache for development, first.

- Smart Contract:
  - piece of code that runs on the Blockchain:
    (a) code is stateful.
    (b) its functions are invoked via transactions.
    (c) can execute contract/business logic.
    (d) Solidity and Many SC languages are Turing complete.
    (e) High level language compiles to Eth Byte Code (and run in Node VMs).

- **All nodes** on the network that contain an official copy of the block-chain **must** independently run a SC transaction.
they must all agree on the final output for the transaction to go through!

#### Caveats on Variable Types:

- all declared variables are initialized with default values - even if we don't set an initial value.
  - bool: false, string: "", ints: 0, addr: 0x000..., etc.
- Boolean Caveat: All assigned values are true. Only false is false. So bool = 5 will become true (for example).
- Address variables are complex objects with a bytes array for address storage. These are fixed and store 20 bytes.
   - Addresses are objects with methods such as .balance(), .transfer() etc.
- Reference Data types (strings, objects...) must be declared with a *memory* keyword. This indicates that we have a pointer
to system memory, and this var should not be stored in a EVM register.
- Strings are byte arrays that are immutable. There are few string methods in Solidity. String processing is expensive (gas), and is
discouraged.
- All public vars have auto-generated getter() methods.
- There are **no floating point** datatypes in native Solidity (!!). The uint256 is the central data type. You have to use ints to make floating point interpretations, if you need this functionality.
- all variables are statically typed - you don't redefine them later on.
- As of Solidity 0.8, you cannot under/overflow uints. Solidity will throw an error. To allow for this behaviour, use the *unchecked*
keyword.

```
function decr() public {
  unchecked {
    uint8Num--;
  }
}

```



#### Smart Contracts Caveats:

- We have two accounts types in Ethereum: Externally Owned Accounts (EOAs) and Smart Contract Accounts.
- EOAs initiate all deployments and transactions.
- A smart contract *cannot* initiate a transaction or deployment on its own.
- SCs can send transactions to other SCs only if an EOA starts the chain.
- The Message Object is a Global Object, that represents the JSON data packet sent with every transaction.
- We do not use try/catch or if/else in SCs, we use the require(<bool statement>, <side-effect>). For example:

```

function doSomething() public {
  require(owner == msg.sender, "You are not the owner!");
  require(msg.value > 0), "Don't be cheap!";

  //do the thing...
}

```
