const mysql = require("mysql")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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