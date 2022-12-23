const db = require("../utils/connect_mysql")

const Employee = {
    getEmployees: (queryString, offsetString, callback) => {
        db.query(`SELECT EmployeeID, Employee.Username, Name, DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role From Employee INNER JOIN User ON Employee.Username=User.Username ${queryString} ORDER BY EmployeeID ASC ${offsetString}`, callback)
    },
    countEmployees: (callback) => {
        db.query(`SELECT COUNT(EmployeeID) AS NumberOfEmployees From Employee`, callback)
    },
    getEmployeeWithPhone: (PhoneNumber, callback) => {
        db.query("SELECT * FROM Employee WHERE PhoneNumber=?", [PhoneNumber], callback)
    },
    getEmployeeWithUsername: (Username, callback) => {
        db.query("SELECT * FROM Employee WHERE Username=?", [Username], callback)
    },
    addEmployee: (data, callback) => {
        const { Username, Name, DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role } = data
        db.query("CALL InsertEmployeeUser(?)", [[Username, Name, DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role]], callback)
    },
    updateEmployee: (rowUpdateString, Username, callback) => {
        db.query(`Update Employee SET ${rowUpdateString} WHERE Employee.Username = ?`, [Username], callback)
    },

}


module.exports = Employee