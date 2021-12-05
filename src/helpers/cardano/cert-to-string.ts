import { jsonToPath } from '../../helpers/utils'

const certToString = (dir, certList) => {
  let result = ''

  for (let cert of certList) {
    result += `--certificate ${cert.cert} `
    if (cert.script) {
      result += `--certificate-script-file ${jsonToPath(dir, cert.script)} `
    }

    if (cert.datum) {
      result += `--certificate-script-datum-value '${JSON.stringify(cert.datum)}' `
    }

    if (cert.redeemer) {
      result += `--certificate-script-redeemer-value '${JSON.stringify(cert.redeemer)}' `
    }

    if (cert.executionUnits) {
      result += `--certificate-execution-units "(${cert.executionUnits[0] + ',' + cert.executionUnits[1]}})" `
    }
  }

  return result
}

export default certToString
