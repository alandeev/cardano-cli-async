import cardanoCli from "cardano-cli-async"; // your instance

const optionsCli = {
  network: "testnet-magic 1097911063", // network
  dir: "./configs", // where will create wallets and txs..
  socketPath: "./configs/testnet-shelley-genesis.json",
  // shelleyGenesisPath: process.env.SHELLEY_GENESIS_PATH,
};

// your cardano instance to use in all operations
const cardanoInstance = new cardanoCli(optionsCli); 

export default cardanoInstance