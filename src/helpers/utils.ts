import { randomUUID } from 'crypto'
import fs from 'fs'

export const removeEmptyValues = <T = any>(obj: any): T => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmptyValues(obj[key])
    // eslint-disable-next-line no-param-reassign
    else if (obj[key] === undefined || obj[key] === null) delete obj[key]
  })

  return obj
}

export const jsonToPath = (dir, json, type = 'script') => {
  let uniqueId = randomUUID()

  fs.writeFileSync(`${dir}/tmp/${type}_${uniqueId}.json`, JSON.stringify(json))
  return `${dir}/tmp/${type}_${uniqueId}.json`
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
