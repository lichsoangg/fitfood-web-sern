const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: "FITFOOD",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
