const db = require("../utils/connect_mysql");

const User = {
    getUsers: (callback) => {
        db.query("SELECT * FROM User", callback);
    },
    getUserWithName: (username, callback) => {
        db.query("SELECT * FROM User WHERE Username=?", [username], callback);
    },
    postUser: (data, callback) => {
        db.query("INSERT INTO User (`Username`,`Password`) VALUES (?)", [data], callback);
    }
};

module.exports = User;