import queryTip from '@commands/query-tip'
import auxScriptToString from '@helpers/cardano/aux-script-to-string'
import certToString from '@helpers/cardano/cert-to-string'
import mintToString from '@helpers/cardano/mint-to-string'
import txInToString from '@helpers/cardano/tx-in-to-string'
import txOutToString from '@helpers/cardano/tx-out-to-string'
import withdrawalToString from '@helpers/cardano/withdraw-to-string'
import execAsync from '@helpers/command-async'
import { jsonToPath } from '@helpers/utils'
import { InstanceOptions } from '@models/cardano'

const transactionBuild = async (options: any, instanceOptions: InstanceOptions) => {
  let UID = Math.random().toString(36).substr(2, 9)
  const txInString = txInToString(instanceOptions.dir, options.txIn, false)
  const txOutString = txOutToString(options.txOut)
  const txInCollateralString = options.txInCollateral ? txInToString(instanceOptions.dir, options.txInCollateral, true) : ''
  const changeAddressString = options.changeAddress ? `--change-address ${options.changeAddress}` : ''
  const mintString = options.mint ? mintToString(instanceOptions.dir, options.mint) : ''
  const withdrawals = options.withdrawals ? withdrawalToString(instanceOptions.dir, options.withdrawals) : ''
  const certs = options.certs ? certToString(instanceOptions.dir, options.certs) : ''
  const metadata = options.metadata ? '--metadata-json-file ' + jsonToPath(instanceOptions.dir, options.metadata, 'metadata') : ''
  const auxScript = options.auxScript ? auxScriptToString(instanceOptions.dir, options.auxScript) : ''
  const scriptInvalid = options.scriptInvalid ? '--script-invalid' : ''
  const witnessOverride = options.witnessOverride ? `--witness-override ${options.witnessOverride}` : ''

  const tip = await queryTip(instanceOptions)

  await execAsync(`${instanceOptions.cliPath} transaction build \
              ${txInString} \
              ${txOutString} \
              ${txInCollateralString} \
              ${certs} \
              ${withdrawals} \
              ${mintString} \
              ${auxScript} \
              ${metadata} \
              ${scriptInvalid} \
              ${witnessOverride} \
              --invalid-hereafter ${options.invalidAfter ? options.invalidAfter : tip.slot + 10000} \
              --invalid-before ${options.invalidBefore ? options.invalidBefore : 0} \
              --out-file ${instanceOptions.dir}/tmp/tx_${UID}.raw \
              ${changeAddressString} \
              --${instanceOptions.network} \
              ${instanceOptions.era}`)

  return `${instanceOptions.dir}/tmp/tx_${UID}.raw`
}

export default transactionBuild
