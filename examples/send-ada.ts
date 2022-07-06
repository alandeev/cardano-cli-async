import cardano from './cardano-instance' // your instance

import {
  toLovelace,
  buildTransaction,
  getUtxosWithoutAssets,
  signTransaction
} from './cardano-utils'

const MIN_ADA = 2
const MIN_AMOUNT_LOVELACE = toLovelace(MIN_ADA)

interface CacheWallet {
  total_lovelace: number
  utxos: any[]
}

interface ICreateTransaction {
  address_name: string
  receiver_address: string
  transfer_amount_ada: number
  cache: CacheWallet | null
  path_protocol_parameters?: string
}

async function transferAdaWithAddress(model: ICreateTransaction) {
  const WALLET_BALANCE = cardano.wallet(model.address_name)

  let ownerUtxos = model.cache?.utxos
  let totalAmountLovelace = model.cache?.total_lovelace as number

  if(!model.cache) {
    const wallet = await WALLET_BALANCE.balance()
    const filtedUtxos = getUtxosWithoutAssets(wallet.utxos)

    ownerUtxos = filtedUtxos.utxos
    totalAmountLovelace = filtedUtxos.total_amount
  }

  const TRANSFER_AMOUNT_LOVELACE = toLovelace(model.transfer_amount_ada)

  const receivesOutPut = {
    address: model.receiver_address,
    value: { lovelace: totalAmountLovelace },
  }

  const backAmountLovelace = totalAmountLovelace - TRANSFER_AMOUNT_LOVELACE
  if (backAmountLovelace < 0) {
    console.warn({
      message: 'Wallet not has balance',
      model,
    })

    throw new Error('Wallet not has balance')
  }

  const txOuts: any[] = []

  if (backAmountLovelace >= MIN_AMOUNT_LOVELACE) {
    receivesOutPut.value.lovelace = TRANSFER_AMOUNT_LOVELACE

    const backUtxo = {
      address: WALLET_BALANCE.paymentAddr,
      value: { lovelace: backAmountLovelace },
    }

    txOuts.push(backUtxo)
  }

  txOuts.push(receivesOutPut)

  const txInfo = {
    txIn: ownerUtxos,
    txOut: txOuts,
    witnessCount: 1,
  }

  const dataRaw = await buildTransaction({
    tx: txInfo,
    index_fee: 0,
    protocolParametersPath: model.path_protocol_parameters,
  })

  const signed = await signTransaction(WALLET_BALANCE, dataRaw)

  const txHash = await cardano.transactionSubmit(signed)

  return txHash.replace('\n', '')
}

const result = await transferAdaWithAddress({
  address_name: "address-name", // your address address name
  cache: { // ( OPCIONAL ) if you has cache storaged
    total_lovelace: toLovelace(100), // total amount in your address
    utxos: [] // utxos to use in transaction
  },
  receiver_address: "address-to-send-ada", // address to send ADA
  transfer_amount_ada: 10, // amount to send 
})

console.log(result) // transaction result.