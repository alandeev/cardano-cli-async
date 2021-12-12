import { randomUUID } from 'crypto'
import fs from 'fs/promises'

export const removeEmptyValues = <T = any>(obj: any): T => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmptyValues(obj[key])
    // eslint-disable-next-line no-param-reassign
    else if (obj[key] === undefined || obj[key] === null) delete obj[key]
  })

  return obj
}

export const jsonToPath = async (dir, json, type = 'script') => {
  let uniqueId = randomUUID()

  const file = `${dir}/tmp/${type}_${uniqueId}.json`
  const body = JSON.stringify(json)

  await fs.writeFile(file, body)
  return file
}

export const setKeys = (obj, path, value) => {
  var pList = path.split('.')
  var len = pList.length
  for (var i = 0; i < len - 1; i++) {
    var elem = pList[i]
    if (!obj[elem]) obj[elem] = {}
    obj = obj[elem]
  }

  obj[pList[len - 1]] = value
}

export const signingKeysToString = (signingKeys: string[]) => {
  let result = ''

  for (let signingKey of signingKeys) {
    result += `--signing-key-file ${signingKey} `
  }

  return result
}

export const fileExists = async (files: string[]) => {
  for (let file of files) {
    const fileExist = await fs.readFile(file).catch(() => false)
    if (fileExist) {
      throw new Error(`Already exist this file ${file}`)
    }
  }

  return files
}
