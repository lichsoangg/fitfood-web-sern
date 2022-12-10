const db = require("../utils/connect_mysql")
const Bill = {
    addBill: (data, callback) => {
        db.query("INSERT INTO Bill SET ?", data, callback)
    },
    getBill: (callback) => {
        db.query(`SELECT BillID, Date, State, B.CustomerID, B.EmployeeID, C.Name AS CustomerName,E.Name As EmployeeName 
        FROM Bill B INNER JOIN Customer C ON B.CustomerID = C.CustomerID
        INNER JOIN Employee E ON E.EmployeeID = B.CustomerID`, callback)
    }
}

module.exports = Bill
