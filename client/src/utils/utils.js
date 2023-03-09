export function formatNumberToSocialStyle(value) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function formatCurrency(currency) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function removeSpecialCharacter(str) {
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
}

export function generateUrlByNameAndId({ name, id }) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export function getIdFromUrl(url) {
  const arr = url.split('-i-')
  return arr[arr.length - 1]
}
