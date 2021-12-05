import { jsonToPath } from '@helpers/utils'

const txInToString = (dir, txInList, isCollateral) => {
  let result = ''
  for (let txIn of txInList) {
    result += `--tx-in${isCollateral ? '-collateral' : ''} ${txIn.txHash}#${txIn.txId} `

    if (txIn.script) {
      result += `--tx-in-script-file ${jsonToPath(dir, txIn.script)} `
    }

    if (txIn.datum) {
      result += `--tx-in-script-datum-value '${JSON.stringify(txIn.datum)}' `
    }

    if (txIn.redeemer) {
      result += `--tx-in-script-redeemer-value '${JSON.stringify(txIn.redeemer)}' `
    }

    if (txIn.executionUnits) {
      result += `--tx-in-execution-units "(${txIn.executionUnits[0] + ',' + txIn.executionUnits[1]}})" `
    }
  }
  return result
}

export default txInToString
