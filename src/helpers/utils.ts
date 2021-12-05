export const removeEmptyValues = <T = any>(obj: any): T => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmptyValues(obj[key])
    // eslint-disable-next-line no-param-reassign
    else if (obj[key] === undefined || obj[key] === null) delete obj[key]
  })

  return obj
}
