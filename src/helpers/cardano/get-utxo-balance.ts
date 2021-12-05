import { Utxo } from '@models/cardano'

interface BalanceResponse {
  lovelace: number
  [asset: string]: number
}

const getUtxoBalance = (utxo: Utxo) => {
  const objectResult: BalanceResponse = { lovelace: 0 }
  const values = Object.entries(utxo.value)

  for (let [key, value] of values) {
    if (!objectResult[key]) {
      objectResult[key] = 0
    }

    objectResult[key] += value
  }

  return objectResult
}

export default getUtxoBalance
