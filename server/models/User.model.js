const db = require("../utils/connect_mysql");

const User = {
    getUserWithName: (username, callback) => {
        db.query("SELECT * FROM User WHERE Username=?", [username], callback);
    },
    getUsers: (callback) => {
        db.query("SELECT * FROM USER", callback);
    },
    getUserInfo: (username, callback) => {
        db.query("CALL GetInfoUser(?);", [[username]], callback);
    },
    updatePassword: (data, callback) => {
        const { Username, passwordHashed } = data;
        db.query("UPDATE User SET Password=? WHERE Username=?", [passwordHashed, Username], callback);
    },
    updateActive: (username, callback) => {
        db.query("UPDATE USER SET IsActive=1 WHERE Username=?", [username], callback);
    },
    getUserWithPhoneNumber: (phoneNumber, callback) => {
        db.query("SELECT * FROM User LEFT JOIN Customer ON User.Username=Customer.Username LEFT JOIN Employee ON Employee.Username = User.Username WHERE  Customer.PhoneNumber=? OR Employee.PhoneNumber=?", [phoneNumber,phoneNumber], callback);
    },
};


module.exports = User;