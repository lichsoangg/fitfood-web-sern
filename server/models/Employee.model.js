const db = require("../utils/connect_mysql");

const Employee = {
    getEmployees: (queryString,offsetString,callback) => {
        db.query(`SELECT ID, Employee.Username, Name, DATE_FORMAT(DayOfBirth, '%Y/%m/%d') as DayOfBirth, PhoneNumber, Gender, Province, District, Ward, Address, Avatar, Role From Employee INNER JOIN User ON Employee.Username=User.Username ${queryString} ORDER BY ID ASC ${offsetString}`, callback);
    },
    countEmployees:(callback)=>{
        db.query(`SELECT COUNT(ID) AS NumberOfEmployees From Employee`,callback);
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