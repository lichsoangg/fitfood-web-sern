const db = require("../utils/connect_mysql");

const checkFieldExisted = (data, field, table) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT COUNT(*) AS total FROM ${table} WHERE ${field} = ?`,
      [data],
      function (error, results, fields) {
        if (!error) {
          return resolve(results[0].total > 0);
        } else {
          return reject(new Error("Database error!!"));
        }
      }
    );
  });
};
module.exports = checkFieldExisted;
