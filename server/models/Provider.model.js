const db = require("../utils/connect_mysql")
const Provider = {
    addProvider: (data, callback) => {
        db.query("INSERT INTO Provider SET ?", data, callback)
    },
    getProviders: (callback) => {
        db.query("SELECT ProviderId, Name, PhoneNumber, Address From Provider", callback)
    },
    updateProvider: (rowUpdateString, ProviderId, callback) => {
        db.query(`UPDATE Provider SET ${rowUpdateString} WHERE ProviderID=?`, [ProviderId], callback)
    },
    deleteProvider: (ProviderId, callback) => {
        db.query(`DELETE FROM Provider Where ProviderID=?`, [ProviderId], callback)
    }
}
module.exports = Provider