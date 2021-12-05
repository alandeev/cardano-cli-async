interface ValueUtxo {
  lovelace: number
  [key: string]: number
}

export interface Utxo {
  txHash: string
  txId: number
  value: ValueUtxo
  datumHash?: any
}

export interface InstanceOptions {
  network: string
}
