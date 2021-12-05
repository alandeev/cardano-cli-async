import { removeEmptyValues } from '@helpers/utils'
import { Utxo } from '@models/cardano'

const formatUtxo = (rawUtxo: string): Utxo => {
  const [txHash, txId, ...restOptions] = rawUtxo.replace(/\s+/g, ' ').split(' ')

  const restRawList = restOptions.join(' ').split('+')

  const result = {
    txHash,
    txId: parseInt(txId),
    value: {},
    datumHash: null
  }

  for (let item of restRawList) {
    const isTxDatum = item.includes('TxOutDatumHash') || item.includes('TxOutDatumNone')
    if (isTxDatum) {
      if (!item.includes('None')) {
        result.datumHash = JSON.parse(item.trim().split(' ')[2])
      }

      continue
    }

    const [quantity, asset] = item.trim().split(' ')
    result.value[asset] = parseInt(quantity)
  }

  return removeEmptyValues(result)
}

const formatRawUtxos = (utxosRaw: string) => {
  const utxos = utxosRaw.split('\n')
  utxos.splice(0, 2) // remove random texts
  utxos.splice(utxos.length - 1, 1) // remove random final text

  const result = utxos.map(formatUtxo)

  return result
}
export default formatRawUtxos
