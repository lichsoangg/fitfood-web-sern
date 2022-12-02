const SearchObjectArray = (search, data, searchKeyName) => {
  return data.filter((item) => item[searchKeyName].toString() === search.toString())[0];
};

export default SearchObjectArray;
