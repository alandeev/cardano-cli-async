import execAsync from '@helpers/command-async'

const buildCommand = (instanceOptions) =>
  `${instanceOptions.cliPath} query tip \
      --${instanceOptions.network} \
      --cardano-mode
  `.trim()

const queryTip = async (instanceOptions): Promise<any> => {
  const rawCommand = buildCommand(instanceOptions)

  const rawResult = await execAsync(rawCommand)

  return JSON.parse(rawResult)
}

export default queryTip
