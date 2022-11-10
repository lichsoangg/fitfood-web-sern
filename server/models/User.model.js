const db = require("../utils/connect_mysql");

const User = {
    getUserWithName: (username, callback) => {
        db.query("SELECT * FROM User WHERE Username=?", [username], callback);
    },
    getUsers:(callback)=>{
        db.query("SELECT * FROM USER",callback);
    },
    getUserInfo: (username,callback)=>{
        db.query("CALL GetInfoUser(?);",[[username]],callback);
    }
 
};


module.exports = User;