const db = require("../utils/connect_mysql")
const DeliveryNote = {
    addDeliveryNote: (data, callback) => {
        db.query("INSERT INTO DeliveryNote SET ?", data, callback)
    },
    getDeliveryNotes: (callback) => {
        db.query(`SELECT DeliveryNoteID, Date, DeliveryNote.ProviderID, Provider.Name as ProviderName, DeliveryNote.EmployeeID, Employee.Name as EmployeeName
        FROM DeliveryNote INNER JOIN Provider ON DeliveryNote.ProviderID=Provider.ProviderID
        INNER JOIN Employee ON DeliveryNote.EmployeeID= Employee.EmployeeID`, callback)
    },
    updateDeliveryNote: (rowUpdateString, deliveryNoteID, callback) => {
        db.query(`UPDATE DeliveryNote Set ${rowUpdateString} Where DeliveryNoteId=?`, [deliveryNoteID], callback)
    },
    deleteDeliveryNote: (deliveryNoteID, callback) => {
        db.query(`DELETE FROM DeliveryNote WHERE DeliveryNoteId=? `, [deliveryNoteID], callback)
    }
}

module.exports = DeliveryNote