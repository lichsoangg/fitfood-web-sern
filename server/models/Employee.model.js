const db = require("../utils/connect_mysql");

const Employee = {
    getEmployees: (page, limit, callback) => {
        db.query(`SELECT ID, Employee.Username, Name, DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role From Employee INNER JOIN User ON Employee.Username=User.Username LIMIT ${page * limit - limit},${limit}`, callback);
    },
    getEmployeeWithPhone: (PhoneNumber, callback) => {
        db.query("SELECT * FROM Employee WHERE PhoneNumber=?", [PhoneNumber], callback);
    },
    getEmployeeWithUsername: (Username, callback) => {
        db.query("SELECT * FROM Employee WHERE Username=?", [Username], callback);
    },
    addEmployee: (data, callback) => {
        const { Username, Name, DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role } = data;
        db.query("CALL InsertEmployeeUser(?)", [[Username, Name, DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role]], callback);
    },
    updateEmployee: (objectData, Username, callback) => {
        let q = "";
        for (key in objectData) {
            let value = objectData[key];
            q += `${key}='${value}',`;
        }
        q = q.slice(0, q.length - 1);
        db.query(`Update Employee SET ${q} WHERE Employee.Username = ?`, [Username], callback);
    },
};


module.exports = Employee;