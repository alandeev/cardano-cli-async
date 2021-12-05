import { jsonToPath } from '@helpers/utils'

const withdrawalToString = (dir, withdrawalList) => {
  let result = ''
  for (let withdrawal of withdrawalList) {
    result += `--withdrawal ${withdrawal.stakingAddress}+${withdrawal.reward} `

    if (withdrawal.script) {
      result += `--withdrawal-script-file ${jsonToPath(dir, withdrawal.script)} `
    }

    if (withdrawal.datum) {
      result += `--withdrawal-script-datum-value '${JSON.stringify(withdrawal.datum)} `
    }

    if (withdrawal.redeemer) {
      result += `--withdrawal-script-redeemer-value '${JSON.stringify(withdrawal.redeemer)}' `
    }

    if (withdrawal.executionUnits) {
      result += `--withdrawal-execution-units "(${withdrawal.executionUnits[0] + ',' + withdrawal.executionUnits[1]}})" `
    }
  }

  return result
}

export default withdrawalToString
