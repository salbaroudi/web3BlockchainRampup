## Uniswap Exhange Notes:

### Glossary:

- **Economic Rent:** increasing one's personal wealth without creating any additional wealth for society. Often done via gatekeeping, and through manipulating the market environment.

- **Front-Running:** Use of insider information to make a profit, in an unfair manner to other market participants.

- **Bonding Curve**: Function that determines the price of a given swap, based on previous trade history and current market liquidity.


### Uniswap V1:

- uses a **Constant Function Market Maker Mechanism** (xy = k), to control pricing for trades. This makes pricing hyperbolic, if it trades in one direction too much. This curve is also known as a **Bonding Curve**.
- **Structure of Code**:

1) Factory Contract: Generates different exchange contracts (pairs of ETH and Token contract), and keeps a registry of them all.
2) Exchange Contract: Represents a particular trading pair, is controlled and launched by an entity that issues/possesses a supply of tokens. 

Uniswap launches the Factory Contract, and market makers register exchange contracts and provide liquidity.

- When a buyer wishes to buy a token with ETH, a search for the contract is done by the Factory, and the trade itself is contained in the relevent Exchange Contract.
- When a buyer wishes to swap two (non-ETH) tokens, this involves an interaction between two Exchange contracts. ETH is used as a common denomination between all contracts.