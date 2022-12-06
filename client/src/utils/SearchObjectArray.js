const SearchObjectArray = (search, data, searchKeyName) => {
  if (search && data && searchKeyName) {
    const isNumber = !isNaN(data[0][searchKeyName])
    if (isNumber) {
      return data.filter((item) => item[searchKeyName] * 1 === search * 1)[0]
    } else return data.filter((item) => item[searchKeyName].toString() === search.toString())[0]
  }

  return null
}

export default SearchObjectArray
