import cardano from './cardano-instance' // your instance

export const toLovelace = (ada: number) => {
  return ada * 1000000
}

export const getUtxosWithoutAssets = (utxos: any[]) => {
  const newUtxos: any[] = []
  let totalAmount = 0
  for (let utxo of utxos) {
    const hasAsset = Object.keys(utxo.value).some((key) => key.length > 40)
    if (!hasAsset) {
      totalAmount += utxo.value.lovelace
      newUtxos.push(utxo)
    }
  }

  return {
    utxos: newUtxos,
    total_amount: totalAmount,
  }
}

export const getOnlyAssets = (utxos: any[]) => {
  const newAssets: Record<string, number> = {}

  for (let utxo of utxos) {
    const assets = Object.entries(utxo.value)
    for (let [key, value] of assets) {
      if (key.length > 40) {
        newAssets[key] = value as number
      }
    }
  }

  return newAssets
}

export const removeEmptyValues = <T = any>(obj: any): T => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmptyValues(obj[key])
    // eslint-disable-next-line no-param-reassign
    else if (obj[key] === undefined || obj[key] === null) delete obj[key]
  })

  return obj
}

interface BuildTransaction {
  tx: any
  index_fee?: number
  protocolParametersPath?: string
}

export const buildTransaction = async ({
  tx,
  index_fee = 0,
  protocolParametersPath,
}: BuildTransaction) => {
  const raw = await cardano.transactionBuildRaw(tx)

  const feeOptions = {
    ...tx,
    txBody: raw,
    protocolParametersPath,
  }

  const fee = await cardano.transactionCalculateMinFee(feeOptions)

  tx.txOut[index_fee].value.lovelace -= fee

  return cardano.transactionBuildRaw({ ...tx, fee })
}

export const signTransaction = async (wallet: any, tx: any) => {
  return cardano.transactionSign({
    signingKeys: [wallet.payment.skey],
    txBody: tx,
  })
}

