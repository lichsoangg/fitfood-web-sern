const mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: 'FITFOOD'
})

connection.connect((err, connection) => {
    if (err) {
        console.log(`MySQL error: ${JSON.stringify(err)}`)
        return
    }
})


module.exports = connection