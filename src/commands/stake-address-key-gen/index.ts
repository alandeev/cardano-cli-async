import execAsync from '../../helpers/command-async'
import { fileExists } from '../../helpers/utils'
import { InstanceOptions } from '../../models/cardano'

interface IBuildCommand {
  vkey: string
  skey: string
}

const buildCommand = (options: IBuildCommand, instanceOptions: InstanceOptions) =>
  `${instanceOptions.cliPath} stake-address key-gen \
--verification-key-file ${options.vkey} \
--signing-key-file ${options.skey}
`

const stakeAddressKeyGen = async (account: string, instanceOptions: InstanceOptions) => {
  const vkey = `${instanceOptions.dir}/priv/wallet/${account}/${account}.stake.vkey`
  const skey = `${instanceOptions.dir}/priv/wallet/${account}/${account}.stake.skey`
  await fileExists([vkey, skey])

  await execAsync(`mkdir -p ${instanceOptions.dir}/priv/wallet/${account}`)

  const commnad = buildCommand({ vkey, skey }, instanceOptions)
  await execAsync(commnad)
  return { vkey, skey }
}

export default stakeAddressKeyGen
