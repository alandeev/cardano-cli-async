import execAsync from '../../helpers/command-async'
import { signingKeysToString } from '../../helpers/utils'
import { InstanceOptions, TransactionSign } from '../../models/cardano'

const buildCommand = (options: any, instanceOptions: InstanceOptions) => {
  return `${instanceOptions.cliPath} transaction sign \
  --tx-body-file ${options.txBody} \
  --${instanceOptions.network} \
  ${options.signingKeys} \
  --out-file ${instanceOptions.dir}/tmp/tx_${options.uid}.signed`
}

const transactionSign = async (options: TransactionSign, instanceOptions: InstanceOptions) => {
  const uid = Math.random().toString(36).substr(2, 9)
  const signingKeys = signingKeysToString(options.signingKeys)

  const command = buildCommand(
    {
      ...options,
      signingKeys,
      uid
    },
    instanceOptions
  )

  await execAsync(command)

  return `${instanceOptions.dir}/tmp/tx_${uid}.signed`
}

export default transactionSign
