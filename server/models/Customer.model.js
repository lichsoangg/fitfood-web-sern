const db = require("../utils/connect_mysql");

const Customer = {
    postCustomer: (data, callback) => {
        const { username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address } = data;
        db.query("CALL InsertCustomerUser(?);", [[username, password, name, dayOfBirth, phoneNumber, gender, province, district, ward, address]], callback);
    }
};

module.exports = Customer;