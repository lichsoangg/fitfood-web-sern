const db = require("../utils/connect_mysql")
const ReportRevenue = {
    getReportRevenue: ({ dateStart, dateEnd, employeeID, customerID, productID }, callback) => {
        db.query(`SELECT Sum(Quantity * SalePrice) as Revenue 
        FROM Bill B INNER JOIN DetailBill DB ON B.BillID = DB.BillID  
        Where Date > ? And Date < ? 
        And (? IS NULL OR ?=EmployeeID)
        And (? IS NULL OR ?=CustomerID)
        And (? IS NULL OR ?=ProductID)`,
            [dateStart, dateEnd, employeeID, employeeID, customerID, customerID, productID, productID], callback)
    },
    getEmployeesRevenue: ({ dateStart, dateEnd }, callback) => {
        db.query(`SELECT E.EmployeeID, E.Avatar, E.Name, Sum(Quantity* SalePrice) As Revenue FROM Bill B 
        INNER JOIN DetailBill DB ON B.BillID=DB.BillID 
        INNER JOIN Employee E ON E.EmployeeID= B.EmployeeID Where Date >= ? and Date <= ?
        Group By E.EmployeeID, E.Avatar, E.Name
        Order by Sum(Quantity* SalePrice) DESC;
        `, [dateStart, dateEnd], callback)
    },
    getCustomersRevenue: ({ dateStart, dateEnd }, callback) => {
        db.query(`SELECT C.CustomerID, C.Avatar, C.Name, Sum(Quantity* SalePrice) As Revenue FROM Bill B 
        INNER JOIN DetailBill DB ON B.BillID=DB.BillID 
        INNER JOIN Customer C ON C.CustomerID= B.CustomerID Where Date >= ? and Date <= ?
        Group By C.CustomerID, C.Avatar, C.Name
        Order by Sum(Quantity* SalePrice) DESC;`, [dateStart, dateEnd], callback)
    },
    getProductsRevenue: ({ dateStart, dateEnd }, callback) => {
        db.query(`SELECT P.ProductID,P.Name, Sum(DB.Quantity* SalePrice) As Revenue FROM Bill B 
        INNER JOIN DetailBill DB ON B.BillID=DB.BillID 
        INNER JOIN Product P ON P.ProductID= DB.ProductID Where Date >= ? and Date <= ?
        Group By P.ProductID, P.Name
        Order by Sum(Quantity* SalePrice) DESC;;`, [dateStart, dateEnd], callback)
    },
}

module.exports = ReportRevenue