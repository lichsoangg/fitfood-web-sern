const db = require("../utils/connect_mysql");

const User = {
    getUsers: (callback) => {
        db.query("SELECT * FROM User", callback);
    },
    getUserWithName: (username, callback) => {
        db.query("SELECT * FROM User WHERE Username=?", [username], callback);
    },
    postUser: (data, callback) => {
        const { username, password } = data;
        db.query("INSERT INTO User (`Username`,`Password`) VALUES (?)", [[username, password]], callback);
    }
};

module.exports = User;