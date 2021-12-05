import transactionTxid from '@cardano/transaction-tx-id'
import execAsync from '@helpers/command-async'
import { InstanceOptions } from '@models/cardano'
import fs from 'fs'

const buildCommand = (options: any, instanceOptions: InstanceOptions) =>
  `
  ${instanceOptions.cliPath} transaction submit --${instanceOptions.network} --tx-file ${options.txFile}
`.trim()

const transactionSubmit = async (tx: object | string, instanceOptions: InstanceOptions) => {
  const uid = Math.random().toString(36).substr(2, 9)
  let txFile = tx

  if (typeof tx == 'object') {
    txFile = `${instanceOptions.dir}/tmp/tx_${uid}.signed`
    fs.writeFileSync(txFile, JSON.stringify(tx))
  }

  const command = buildCommand({ txFile }, instanceOptions)

  await execAsync(command)

  return transactionTxid({ txFile }, instanceOptions)
}

export default transactionSubmit
