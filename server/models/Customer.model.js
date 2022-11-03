const db = require("../utils/connect_mysql");

const Customer = {
    postCustomer: (data, callback) => {
        const { username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address } = data;
        db.query("CALL InsertCustomerUser(?);", [[username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address]], callback);
    },
    getCustomerWithPhone: (phoneNumber, callback) => {
        db.query("SELECT * FROM Customer WHERE PhoneNumber=?", [phoneNumber], callback);
    },
};

module.exports = Customer;