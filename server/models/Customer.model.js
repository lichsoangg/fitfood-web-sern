const db = require("../utils/connect_mysql")

const Customer = {
    postCustomer: (data, callback) => {
        const { username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address } = data
        db.query("CALL InsertCustomerUser(?);", [[username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address]], callback)
    },

    getCustomerWithUsername: (username, callback) => {
        db.query("SELECT * FROM Customer WHERE Username=?", [username], callback)
    },
    updateCustomer: (rowUpdateString, username, callback) => {
        db.query(`UPDATE Customer SET ${rowUpdateString} WHERE Customer.Username =?`, [username], callback)
    }
}

module.exports = Customer