interface ValueUtxo {
  lovelace: lovelace
  [key: string]: number
}

export interface Utxo {
  txHash: string
  txId: number
  value: ValueUtxo
  datumHash?: any
}

export interface InstanceOptions {
  network?: string
  cliPath?: string
  dir?: string
  era?: string
  socketPath?: string
  protocolParametersPath?: string
}

type lovelace = number
type path = string

export type TxIn = {
  txHash: string
  txId: string
  script?: any
  datum?: any
  redeemer?: any
  executionUnits?: [number, number]
}

export type TxOut = {
  address: string
  value: ValueUtxo
  datumHash?: string
}

export type TxInCollateral = {
  txHash: string
  txId: string
}

export type Withdrawal = {
  stakingAddress: string
  reward: lovelace
  script?: Object
  datum?: Object
  redeemer?: Object
  executionUnits: [number, number]
}

export type Certificate = {
  cert: string
  script?: any
  datum?: any
  redeemer?: any
  executionUnits?: [number, number]
}

export type Mint = {
  action: string
  quantity: string
  asset: string
  script: any
  datum?: any
  redeemer?: any
  executionUnits: [number, number]
}

export interface TransactionBuildRaw {
  txIn: TxIn[]
  txOut: TxOut[]
  txInCollateral?: TxInCollateral[]
  changeAddress?: string
  withdrawals?: Withdrawal[]
  certs?: Certificate[]
  fee?: lovelace
  mint?: Mint[]
  auxScript?: Object[]
  metadata?: Object
  invalidBefore?: number
  invalidAfter?: number
  scriptInvalid?: boolean
}

export interface TransactionCalculateMinFee {
  txBody: string
  txIn: TxIn[]
  txOut: TxOut[]
  witnessCount: number
  protocolParametersPath?: path
}
