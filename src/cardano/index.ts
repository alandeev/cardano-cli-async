import { toLovelace } from '@helpers/cardano/balance'
import { InstanceOptions, TransactionBuildRaw, TransactionCalculateMinFee } from '@models/cardano'
import queryProtocolParametersCLI from './query-protocol-parameters'
import queryStakeAddressInfoCLI from './query-stake-address-info'
import queryTipCLI from './query-tip'
import queryUtxoCLI from './query-utxo'
import transactionBuildRawCLI from './transaction-build-raw'
import transactionCalculateMinFeeCLI from './transaction-calculate-min-fee'
import walletCLI from './wallet'

class CardanoCLI {
  private network: string
  private dir: string
  private cliPath: string
  private era: string
  private protocolParametersPath: string

  constructor(options: InstanceOptions) {
    this.network = options.network ?? 'testnet-magic 1097911063'
    this.cliPath = options.cliPath ?? 'cardano-cli'
    this.dir = options.dir ?? '.'
    this.era = options.era ?? ''
    this.protocolParametersPath = options.protocolParametersPath ?? `${options.dir}/tmp/protocolParams.json`

    this.loadEnvs({
      CARDANO_NODE_SOCKET_PATH: options.socketPath as string
    })
  }

  private loadEnvs(envs: Record<string, string>) {
    for (let [key, value] of Object.entries(envs)) {
      if (value) {
        process.env[key] = value
      }
    }
  }

  private getConfig() {
    return {
      network: this.network,
      cliPath: this.cliPath,
      dir: this.dir,
      era: this.era,
      protocolParametersPath: this.protocolParametersPath
    }
  }

  public queryUtxo(wallet_address: string) {
    const instanceOptions = this.getConfig()
    return queryUtxoCLI(wallet_address, instanceOptions)
  }

  public queryTip() {
    const instanceOptions = this.getConfig()
    return queryTipCLI(instanceOptions)
  }

  public queryProtocolParameters() {
    const instanceOptions = this.getConfig()
    return queryProtocolParametersCLI(instanceOptions)
  }

  public transactionBuildRaw(options: TransactionBuildRaw) {
    const instanceOptions = this.getConfig()
    return transactionBuildRawCLI(options, instanceOptions)
  }

  public queryStakeAddressInfo(stake_address: string) {
    const instanceOptions = this.getConfig()
    return queryStakeAddressInfoCLI(stake_address, instanceOptions)
  }

  public wallet(account: string) {
    const instanceOptions = this.getConfig()
    return walletCLI(account, instanceOptions)
  }

  public transactionCalculateMinFee(options: TransactionCalculateMinFee) {
    const instanceOptions = this.getConfig()
    return transactionCalculateMinFeeCLI(options, instanceOptions)
  }
}

const cardano = new CardanoCLI({
  network: 'testnet-magic 1097911063',
  cliPath: 'cardano-cli',
  dir: './configs'
})

const teste = async () => {
  const account = '61aaebf111ffcef59fee95d0'

  const receiver = 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3'

  const wallet = cardano.wallet(account)
  const { utxos, value } = await wallet.balance()

  const transferAmountADA = 5

  const txInfo = {
    txIn: utxos as any[],
    txOut: [
      {
        address: wallet.paymentAddr,
        value: {
          lovelace: value.lovelace - toLovelace(transferAmountADA)
        }
      },
      {
        address: receiver,
        value: {
          lovelace: toLovelace(transferAmountADA)
        }
      }
    ]
  }

  const raw = await cardano.transactionBuildRaw(txInfo)

  const fee = await cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 1
  })

  console.log({
    fee
  })
}

teste()
  .then()
  .catch((error) => {
    console.log(error)
  })
