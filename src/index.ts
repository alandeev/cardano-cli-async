import { InstanceOptions, TransactionSign, TransactionBuildRaw, TransactionCalculateMinFee, IAddressBuild } from './models/cardano'
import queryProtocolParametersCLI from './commands/query-protocol-parameters'
import queryStakeAddressInfoCLI from './commands/query-stake-address-info'
import queryTipCLI from './commands/query-tip'
import queryUtxoCLI from './commands/query-utxo'
import transactionBuildRawCLI from './commands/transaction-build-raw'
import transactionCalculateMinFeeCLI from './commands/transaction-calculate-min-fee'
import transactionSignCLI from './commands/transaction-sign'
import transactionSubmitCLI from './commands/transaction-submit'
import walletCLI from './commands/wallet'
import addressKeyGenCLI from './commands/address-key-gen'
import stakeAddressKeyGenCLI from './commands/stake-address-key-gen'
import stakeAddressBuildCLI from './commands/stake-address-build'
import addressBuildCLI from './commands/address-build'

class CardanoCLI {
  private network: string
  private dir: string
  private cliPath: string
  private era: string
  private protocolParametersPath: string
  // private shelleyGenesisPath: string

  constructor(options: Partial<InstanceOptions>) {
    this.network = options.network ?? 'testnet-magic 1097911063'
    this.cliPath = options.cliPath ?? 'cardano-cli'
    this.dir = options.dir ?? '.'
    this.era = options.era ?? ''
    this.protocolParametersPath = options.protocolParametersPath ?? `${options.dir}/tmp/protocolParams.json`
    // this.shelleyGenesisPath = options.shelleyGenesisPath ?? ''

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

  public transactionSign(options: TransactionSign) {
    const instanceOptions = this.getConfig()
    return transactionSignCLI(options, instanceOptions)
  }

  public transactionSubmit(tx: object | string) {
    const instanceOptions = this.getConfig()
    return transactionSubmitCLI(tx, instanceOptions)
  }

  public addressKeyGen(account: string) {
    const instanceOptions = this.getConfig()
    return addressKeyGenCLI(account, instanceOptions)
  }

  public stakeAddressKeyGen(account: string) {
    const instanceOptions = this.getConfig()
    return stakeAddressKeyGenCLI(account, instanceOptions)
  }

  public stakeAddressBuild(account: string) {
    const instanceOptions = this.getConfig()
    return stakeAddressBuildCLI(account, instanceOptions)
  }

  public addressBuild(options: IAddressBuild) {
    const instanceOptions = this.getConfig()
    return addressBuildCLI(options, instanceOptions)
  }
}

export default CardanoCLI
