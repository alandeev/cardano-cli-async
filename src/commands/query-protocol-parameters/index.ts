import execAsync from '../../helpers/command-async'
import { InstanceOptions } from '../../models/cardano'

const buildCommand = (options: InstanceOptions) =>
  `${options.cliPath} query protocol-parameters \
  --${options.network} \
  --cardano-mode \
  --out-file ${options.dir}/tmp/protocolParams.json
`.trim()

const queryProtocolParameters = async (instanceOptions: InstanceOptions) => {
  const command = buildCommand(instanceOptions)

  await execAsync(command)

  const rawResult = await execAsync(`cat ${instanceOptions.dir}/tmp/protocolParams.json`)
  return JSON.parse(rawResult)
}

export default queryProtocolParameters
