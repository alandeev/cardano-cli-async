import { jsonToPath } from '../../helpers/utils'

const mintToString = async (dir, minting) => {
  let result = `--mint="`

  for (let mint of minting) {
    if (!((mint.quantity || mint.asset) && (mint.action == 'mint' || mint.action == 'burn'))) {
      throw new Error('type, asset and quantity property required')
    }

    const rawMint = mint.action == 'mint' ? '' : '-'

    result += `${rawMint}${mint.quantity} ${mint.asset}+`
  }

  result = result.substring(0, result.length - 1).trim()

  result += `" `
  const usedScripts: string[] = []

  for (let mint of minting) {
    const script = await jsonToPath(dir, mint.script)
    if (usedScripts.includes(script)) continue
    usedScripts.push(script)

    result += `--minting-script-file ${script} ${mint.datum ? `--tx-in-script-datum-value '${JSON.stringify(mint.datum)}' ` : ''}
    ${mint.redeemer ? `--tx-in-script-redeemer-value '${JSON.stringify(mint.redeemer)}' ` : ''}
    ${mint.executionUnits ? `--tx-in-execution-units "(${mint.executionUnits[0] + ',' + mint.executionUnits[1]}})" ` : ''}`
  }

  return result
}

export default mintToString
