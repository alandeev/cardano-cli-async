import { jsonToPath } from '../../helpers/utils'

const auxScriptToString = async (dir, scriptList) => {
  let newScriptList: string[] = []

  for (let script of scriptList) {
    const file = await jsonToPath(dir, script)

    const data = `--auxiliary-script-file ${file}`
    newScriptList.push(data)
  }

  return newScriptList.join(' ')
}

export default auxScriptToString
