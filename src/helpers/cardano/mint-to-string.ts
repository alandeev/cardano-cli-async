import { jsonToPath } from '@helpers/utils'

const mintToString = (dir, minting) => {
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

  result += minting
    .map((mint) => {
      const script = jsonToPath(dir, mint.script)
      if (usedScripts.includes(script)) return ''
      usedScripts.push(script)

      return `--minting-script-file ${script} ${mint.datum ? `--tx-in-script-datum-value '${JSON.stringify(mint.datum)}' ` : ''} 
      ${mint.redeemer ? `--tx-in-script-redeemer-value '${JSON.stringify(mint.redeemer)}' ` : ''}
      ${mint.executionUnits ? `--tx-in-execution-units "(${mint.executionUnits[0] + ',' + mint.executionUnits[1]}})" ` : ''}`
    })
    .join(' ')

  return result
}

export default mintToString
