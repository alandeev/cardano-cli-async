import execAsync from '../../helpers/command-async'
import { InstanceOptions } from '../../models/cardano'

const buildCommand = (options, instanceOptions: InstanceOptions) =>
  `
  ${instanceOptions.cliPath} transaction txid \
  ${options.txBody ? `--tx-body-file ${options.txBody}` : `--tx-file ${options.txFile}`}
`.trim()

const transactionTxid = async (options, instanceOptions: InstanceOptions) => {
  const command = buildCommand(options, instanceOptions)

  const result = await execAsync(command)

  return result
}

export default transactionTxid
