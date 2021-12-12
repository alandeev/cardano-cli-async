import execAsync from '../../helpers/command-async'
import { fileExists } from '../../helpers/utils'
import { InstanceOptions } from '../../models/cardano'

interface IBuildCommand {
  vkey: string
  skey: string
}

const buildCommand = (options: IBuildCommand, instanceOptions: InstanceOptions) =>
  `${instanceOptions.cliPath} address key-gen \
  --verification-key-file ${options.vkey} \
  --signing-key-file ${options.skey}
`

const addressKeyGen = async (account: string, instanceOptions: InstanceOptions) => {
  const vkey = `${instanceOptions.dir}/priv/wallet/${account}/${account}.payment.vkey`
  const skey = `${instanceOptions.dir}/priv/wallet/${account}/${account}.payment.skey`

  await fileExists([vkey, skey])
  await execAsync(`mkdir -p ${instanceOptions.dir}/priv/wallet/${account}`)

  const command = buildCommand({ skey, vkey }, instanceOptions)

  await execAsync(command)

  return { vkey, skey }
}

export default addressKeyGen
