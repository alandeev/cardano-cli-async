import CardanoCLI from '@cardano'
import { toLovelace } from '@helpers/cardano/balance'

const cardano = new CardanoCLI({
  network: 'testnet-magic 1097911063',
  cliPath: 'cardano-cli',
  dir: './configs',
  socketPath: '/home/alandev/cardano-src/configs-testnet/db/node.socket'
})

const teste = async () => {
  const account = '61aaebf111ffcef59fee95d0'

  // const receiver = 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3'

  const sender = cardano.wallet(account)
  const { utxos, value } = await sender.balance()

  console.log({
    value
  })

  const transferAmountADA = 3

  console.log(utxos)
  const receiver = 'addr_test1qzjlc05tyyw264wy7m4u7np5yqdwglks0xhu6765cl4qex9r9kvav4hmznru9px9n7cpa2hmmv4593eegve3t834xppqwskp4t'

  // create raw transaction
  let txInfo = {
    txIn: (await cardano.queryUtxo(sender.paymentAddr)) as any,
    txOut: [
      {
        address: sender.paymentAddr,
        value: {
          lovelace: (await sender.balance()).value.lovelace - toLovelace(5)
        }
      },
      { address: receiver, value: { lovelace: toLovelace(5) } } //value going to receiver
    ]
  }

  // const txInfo = {
  //   txIn: [...utxos],
  //   txOut: [
  //     {
  //       address: receiver,
  //       value
  //     }
  //   ],
  //   witnessCount: 1
  // }

  const raw = await cardano.transactionBuildRaw(txInfo)

  console.log(raw)

  const fee = await cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 1
  })

  txInfo.txOut[0].value.lovelace -= fee

  const tx = await cardano.transactionBuildRaw({
    ...txInfo,
    fee
  })

  const txSigned = await cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
  })

  console.log({
    txSigned
  })

  const hashTx = await cardano.transactionSubmit(txSigned)

  console.log({ hashTx })
}

teste()
  .then()
  .catch((error) => {
    console.log(error)
  })
