const db = require("../utils/connect_mysql");

const Customer = {
    postCustomer: (data, callback) => {
        const { username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address } = data;
        db.query("CALL InsertCustomerUser(?);", [[username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address]], callback);
    },
    getCustomerWithPhone: (phoneNumber, callback) => {
        db.query("SELECT * FROM Customer WHERE PhoneNumber=?", [phoneNumber], callback);
    },
    getCustomerWithUsername: (username, callback) => {

        db.query("SELECT * FROM Customer WHERE Username=?", [username], callback);
    },
    updateCustomer: (objectData, username, callback) => {
        let q = "";
        for (key in objectData) {
            let value = objectData[key];
            q += ` ${key}='${value}',`;
        }
        q = q.slice(0, q.length - 1);
        db.query(`UPDATE Customer SET ${q} WHERE Customer.Username =?`, [username], callback);
    }
};

module.exports = Customer;