const db = require("../utils/connect_mysql")
const DeliveryNoteDetail = {
    addDeliveryNoteDetails: ({ deliveryNoteID, data }, callback) => {
        db.query(`INSERT INTO DetailDeliveryNote (DeliveryNoteID, ProductID, Quantity, ImportPrice) VALUES ?`,
            [data.map(item => [deliveryNoteID, item.ProductID, item.Quantity, item.ImportPrice])],
            callback)
    },
    getDeliveryNoteDetails: ({ deliveryNoteID }, callback) => {
        db.query(`SELECT ProductID, Quantity, ImportPrice FROM DetailDeliveryNote WHERE DeliveryNoteID=?`, [deliveryNoteID], callback)
    },
    updateDeliveryNoteDetail: ({ rowUpdateString, deliveryNoteID, productID }, callback) => {
        db.query(`UPDATE DetailDeliveryNote SET ${rowUpdateString} WHERE DeliveryNoteID=? AND ProductID=?`, [deliveryNoteID, productID], callback)
    },
    deleteDeliveryNoteDetail: ({ deliveryNoteID, productID }, callback) => {
        db.query(`DELETE FROM DetailDeliveryNote WHERE DeliveryNoteID=? AND ProductID=?`, [deliveryNoteID, productID], callback)
    },
    deleteDeliveryNoteDetails: ({ deliveryNoteID }, callback) => {
        db.query(`DELETE FROM DetailDeliveryNote WHERE DeliveryNoteID=?`, [deliveryNoteID], callback)
    },

}



module.exports = DeliveryNoteDetail