import execAsync from '@helpers/command-async'
import formatRawUtxos from '@helpers/cardano/format-raw-utxos'

interface IQueryUtxo {
  address: string
  network: string
}

const buildCommand = (options: IQueryUtxo) =>
  `
cardano-cli query utxo \
  --${options.network} \
  --address ${options.address} \
  --cardano-mode
`.trim()

const queryUtxo = async (options: IQueryUtxo) => {
  const command = buildCommand(options)

  const { stderr: error, stdout: utxosRaw } = await execAsync(command)
  if (error) {
    throw new Error(error)
  }

  const utxos = formatRawUtxos(utxosRaw)
  return utxos
}

export default queryUtxo
