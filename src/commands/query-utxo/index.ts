import execAsync from '../../helpers/command-async'
import formatRawUtxos from '../../helpers/cardano/format-raw-utxos'
import { InstanceOptions } from '../../models/cardano'

const buildCommand = (address: string, instanceOptions: InstanceOptions) =>
  `
${instanceOptions.cliPath} query utxo \
  --${instanceOptions.network} \
  --address ${address} \
  --cardano-mode
`.trim()

const queryUtxo = async (address: string, instanceOptions: InstanceOptions) => {
  const command = buildCommand(address, instanceOptions)

  const utxosRaw = await execAsync(command)

  const utxos = formatRawUtxos(utxosRaw)
  return utxos
}

export default queryUtxo
