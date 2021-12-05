import { jsonToPath } from '@helpers/utils'

const auxScriptToString = (dir, scriptList) => {
  return scriptList.map((script) => `--auxiliary-script-file ${jsonToPath(dir, script)}`).join(' ')
}

export default auxScriptToString
