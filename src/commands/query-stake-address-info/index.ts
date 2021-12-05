import execAsync from '@helpers/command-async'
import { InstanceOptions } from '@models/cardano'

const buildCommand = (address: string, instanceOptions: InstanceOptions) =>
  `${instanceOptions.cliPath} query stake-address-info \
      --${instanceOptions.network} \
      --address ${address}
    `.trim()

const queryStakeAddressInfo = async (address: string, instanceOptions: InstanceOptions) => {
  const command = buildCommand(address, instanceOptions)

  const rawResult = await execAsync(command)

  return JSON.parse(rawResult)
}

export default queryStakeAddressInfo
