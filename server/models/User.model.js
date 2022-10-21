const db = require("../utils/connect_mysql");

const User = {
    getUserWithName: (username, callback) => {
        db.query("SELECT * FROM User WHERE Username=?", [username], callback);
    },
};


module.exports = User;