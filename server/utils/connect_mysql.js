const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: "FITFOOD",
});

connection.connect((err, connection) => {
  if (err) {
    console.log(`MySQL error: ${JSON.stringify(err)}`);
    return;
  }
});

module.exports = connection;
