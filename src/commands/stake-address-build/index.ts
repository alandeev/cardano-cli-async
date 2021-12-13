import execAsync from '../../helpers/command-async'
import { InstanceOptions } from '../../models/cardano'

const buildCommand = (account: string, instanceOptions: InstanceOptions) =>
  `${instanceOptions.cliPath} stake-address build \
--staking-verification-key-file ${instanceOptions.dir}/priv/wallet/${account}/${account}.stake.vkey \
--out-file ${instanceOptions.dir}/priv/wallet/${account}/${account}.stake.addr \
--${instanceOptions.network}
`

const stakeAddressBuild = async (account: string, instanceOptions: InstanceOptions) => {
  const command = buildCommand(account, instanceOptions)

  await execAsync(command)

  const outFile = `${instanceOptions.dir}/priv/wallet/${account}/${account}.stake.addr`

  return outFile
}

export default stakeAddressBuild
