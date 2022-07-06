import cardano from "./cardano-instance"; // your instance

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

createWallet("my-wallet-name")