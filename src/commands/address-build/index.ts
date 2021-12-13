import { jsonToPath } from '../../helpers/utils'
import execAsync from '../../helpers/command-async'
import { IAddressBuild, InstanceOptions } from '../../models/cardano'

const buildCommand = async (options: IAddressBuild, instanceOptions: InstanceOptions) => {
  const paymentVkey = options.paymeny_vkey && `--payment-verification-key-file ${options.paymeny_vkey}`
  const stakeVkey = options.stake_vkey && `--staking-verification-key-file ${options.stake_vkey}`
  const paymentScript = options.payment_script && `--payment-script-file ${await jsonToPath(instanceOptions.dir, options.payment_script)}`
  const stakeScript = options.stake_script && `--stake-script-file ${await jsonToPath(instanceOptions.dir, options.stake_script)}`

  return `${instanceOptions.cliPath} address build \
    ${paymentVkey || ''} \
    ${stakeVkey || ''} \
    ${paymentScript || ''} \
    ${stakeScript || ''} \
    --out-file ${instanceOptions.dir}/priv/wallet/${options.account}/${options.account}.payment.addr \
    --${instanceOptions.network}
  `.trim()
}

const addressBuild = async (options: IAddressBuild, instanceOptions: InstanceOptions) => {
  const command = await buildCommand(options, instanceOptions)

  await execAsync(command)

  const outFile = `${instanceOptions.dir}/priv/wallet/${options.account}/${options.account}.payment.addr`

  return outFile
}

export default addressBuild
