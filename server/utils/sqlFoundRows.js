const db = require("../utils/connect_mysql");

const sqlFoundRows = (data, field, table) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT FOUND_ROWS() as count`, function (error, results, fields) {
      if (!error) {
        return resolve(results[0].count);
      } else {
        return reject(new Error("Database error!!"));
      }
    });
  });
};
module.exports = sqlFoundRows;
