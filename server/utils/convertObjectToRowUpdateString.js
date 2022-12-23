const convertObjectToRowUpdateString = (object) => {
    let rowUpdateString = ""
    for (key in object) {
        let value = object[key]
        rowUpdateString += ` ${key}='${value}',`
    }
    rowUpdateString = rowUpdateString.slice(0, rowUpdateString.length - 1)
    return rowUpdateString
}

module.exports = convertObjectToRowUpdateString