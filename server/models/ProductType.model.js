const db = require("../utils/connect_mysql")

const ProductType = {
    getProductTypes: (callback) => {
        db.query(`SELECT ProductTypeID, Name From ProductType`, callback)
    },
    addProductType: (data, callback) => {
        db.query(`INSERT INTO ProductType (Name) Values (?)`, [data.Name], callback)
    },
    updateProductType: (rowUpdateString, productTypeId, callback) => {
        db.query(`UPDATE ProductType Set ${rowUpdateString} WHERE ProductTypeID=?`, [productTypeId], callback)
    },
    deleteProductType: (productTypeId, callback) => {
        db.query(`DELETE From ProductType WHERE ProductTypeID=?`, [productTypeId], callback)
    }
}

module.exports = ProductType