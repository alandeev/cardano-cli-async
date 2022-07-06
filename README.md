# Cardano CLI Async

## Overview
This library was developed based on "cardanocli-js" with the aim of refactoring all the features making all processes "asyncronous" and "typed", facilitating the development process and library growth.

## Prerequisites
- cardano-node >= 1.29.0
- node.js >= 12.19.0

## Install
`npm install cardano-cli-async`

## Getting started
> You can see more examples of implementations in folder ./examples

**Creating instance**
```typescript
import cardanoCli from "cardano-cli-async";

const optionsCli = {
  network: process.env.NETWORK,
  dir: process.env.DEFAULT_CONFIG_PATH,
  socketPath: process.env.NODE_SOCKET_PATH,
  // shelleyGenesisPath: process.env.SHELLEY_GENESIS_PATH,
};

// your cardano instance to use in all operations
const cardanoInstance = new cardanoCli(optionsCli); 
```

**Creating wallet**
```typescript
import cardano from "./cardano"; // your instance

const createWallet = async (account: string) => {
  const payment = await cardano.addressKeyGen(account);
  const stake = await cardano.stakeAddressKeyGen(account);
  await cardano.stakeAddressBuild(account);
  await cardano.addressBuild({
    account,
    paymeny_vkey: payment.vkey,
    stake_vkey: stake.vkey,
  });

  return cardano.wallet(account);
};
```


Refactored by: alandev 