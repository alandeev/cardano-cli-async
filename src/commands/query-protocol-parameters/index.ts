import execAsync from '../../helpers/command-async'
import { InstanceOptions } from '../../models/cardano'

const buildCommand = (uid: string, options: InstanceOptions) =>
  `${options.cliPath} query protocol-parameters \
  --${options.network} \
  --cardano-mode \
  --out-file ${options.dir}/tmp/${uid}_protocolParams.json
`.trim()

const queryProtocolParameters = async (instanceOptions: InstanceOptions) => {
  const uid = Math.random().toString(36).substr(2, 9)
  const command = buildCommand(uid, instanceOptions)

  await execAsync(command)

  const path = `${instanceOptions.dir}/tmp/${uid}_protocolParams.json`

  return path
}

export default queryProtocolParameters
