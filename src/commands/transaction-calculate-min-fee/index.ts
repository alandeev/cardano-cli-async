import queryProtocolParameters from '@commands/query-protocol-parameters'
import execAsync from '@helpers/command-async'
import { InstanceOptions, TransactionCalculateMinFee } from '@models/cardano'

const formatResponse = (data: any) => data.toString().replace(/\s+/g, ' ').split(' ')[0]

const buildCommand = (options: TransactionCalculateMinFee, instanceOptions: InstanceOptions) =>
  `${instanceOptions.cliPath} transaction calculate-min-fee \
    --tx-body-file ${options.txBody} \
    --tx-in-count ${options.txIn.length} \
    --tx-out-count ${options.txOut.length} \
    --${instanceOptions.network} \
    --witness-count ${options.witnessCount} \
    --protocol-params-file ${options.protocolParametersPath ?? instanceOptions.protocolParametersPath}
`.trim()

const transactionCalculateMinFee = async (options: TransactionCalculateMinFee, instanceOptions: InstanceOptions) => {
  await queryProtocolParameters(instanceOptions)

  console.log({
    instanceOptions
  })

  const command = buildCommand(options, instanceOptions)

  const response = await execAsync(command)

  const data = formatResponse(response)

  return parseInt(data)
}

export default transactionCalculateMinFee
