import queryTip from '../../commands/query-tip'
import auxScriptToString from '../../helpers/cardano/aux-script-to-string'
import certToString from '../../helpers/cardano/cert-to-string'
import mintToString from '../../helpers/cardano/mint-to-string'
import txInToString from '../../helpers/cardano/tx-in-to-string'
import txOutToString from '../../helpers/cardano/tx-out-to-string'
import withdrawalToString from '../../helpers/cardano/withdraw-to-string'
import execAsync from '../../helpers/command-async'
import { jsonToPath } from '../../helpers/utils'
import { InstanceOptions, TransactionBuildRaw } from '../../models/cardano'

const buildCommand = (options: any, instanceOptions: InstanceOptions) =>
  `${instanceOptions.cliPath} transaction build-raw \
      ${options.txInString} \
      ${options.txOutString} \
      ${options.txInCollateralString} \
      ${options.certs} \
      ${options.withdrawals} \
      ${options.mintString} \
      ${options.auxScript} \
      ${options.metadata} \
      ${options.scriptInvalid} \
      --invalid-hereafter ${options.invalidAfter ?? options.tip.slot + 10000} \
      --invalid-before ${options.invalidBefore ?? 0} \
      --fee ${options.fee ?? 0} \
      --out-file ${instanceOptions.dir}/tmp/tx_${options.uid}.raw \
      ${instanceOptions.era}`.trim()

const transactionBuildRaw = async (options: TransactionBuildRaw, instanceOptions: InstanceOptions) => {
  let UID = Math.random().toString(36).substr(2, 9)
  const txInString = txInToString(instanceOptions.dir, options.txIn, false)
  const txOutString = txOutToString(options.txOut)
  const txInCollateralString = options.txInCollateral ? txInToString(instanceOptions.dir, options.txInCollateral, true) : ''
  const mintString = options.mint ? mintToString(instanceOptions.dir, options.mint) : ''
  const withdrawals = options.withdrawals ? withdrawalToString(instanceOptions.dir, options.withdrawals) : ''
  const certs = options.certs ? certToString(instanceOptions.dir, options.certs) : ''
  const metadata = options.metadata ? '--metadata-json-file ' + jsonToPath(instanceOptions.dir, options.metadata, 'metadata') : ''
  const auxScript = options.auxScript ? auxScriptToString(instanceOptions.dir, options.auxScript) : ''
  const scriptInvalid = options.scriptInvalid ? '--script-invalid' : ''
  const tip = await queryTip(instanceOptions)

  const command = buildCommand(
    {
      txInString,
      txOutString,
      txInCollateralString,
      certs,
      withdrawals,
      mintString,
      auxScript,
      metadata,
      scriptInvalid,
      invalidAfter: options.invalidAfter,
      invalidBefore: options.invalidBefore,
      fee: options.fee,
      tip,
      uid: UID
    },
    instanceOptions
  )

  await execAsync(command)

  return `${instanceOptions.dir}/tmp/tx_${UID}.raw`
}

export default transactionBuildRaw
