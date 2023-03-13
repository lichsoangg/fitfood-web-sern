export function formatNumberToSocialStyle(value) {
  if (!value) return null
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function formatCurrency(currency) {
  if (!currency) return null
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function removeSpecialCharacter(str) {
  if (!str) return null
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export function generateUrlByNameAndId({ name, id }) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export function getIdFromUrl(url) {
  const arr = url.split('-i-')
  return arr[arr.length - 1]
}

export function handleCalcSumPrice(products) {
  const sum = products?.reduce((sumPrice, product) => {
    return Number(sumPrice) + Number(product.Price * product.Quantity)
  }, 0)
  return sum
}
