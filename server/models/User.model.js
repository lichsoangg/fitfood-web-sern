const db = require("../utils/connect_mysql");

const User = {
  addUser: (data, callback) => {
    db.query("INSERT INTO User SET ?", data, callback);
  },
  getUserWithUsername: (username, callback) => {
    db.query("SELECT * FROM User WHERE Username=?", [username], callback);
  },
  updateUser: (rowUpdateString, username, callback) => {
    db.query(
      `UPDATE User SET ${rowUpdateString} WHERE User.Username =?`,
      [username],
      callback
    );
  },
  updatePassword: (data, callback) => {
    const { Username, passwordHashed } = data;
    db.query(
      "UPDATE User SET Password=? WHERE Username=?",
      [passwordHashed, Username],
      callback
    );
  },
  updateActive: (username, callback) => {
    db.query(
      "UPDATE USER SET IsActive=2 WHERE Username=?",
      [username],
      callback
    );
  },
};

module.exports = User;
