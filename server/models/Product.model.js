const db = require("../utils/connect_mysql")
const Product = {
    getProducts: ({ search, productType, orderPrice, numberOffset, numberFetchNext }, callback) => {
        db.query(`
        SELECT ProductID, Product.Name as ProductName, Price, Quantity, Unit, Highlight, Product.ProductTypeID as ProductTypeID, ProductType.Name as ProductTypeName 
        FROM Product INNER JOIN ProductType ON Product.ProductTypeID= ProductType.ProductTypeID 
        WHERE Replace(CONCAT(ProductID,'',Product.Name, Price, Quantity, Unit, Highlight, Product.ProductTypeID, Product.Name),' ','') Like ?
        AND Product.ProductTypeID Like ?
        ORDER BY Product.Name ASC, Price ${orderPrice}
        LIMIT ?,?`,
            [`%${search}%`, `%${productType}%`, numberOffset, numberFetchNext], callback)
    },
    addProduct: (data, callback) => {
        db.query("INSERT INTO Product SET ?", data, callback)

    },
    updateProduct: (rowUpdateString, productID, callback) => {
        db.query(`UPDATE Product SET ${rowUpdateString} Where ProductID =? `, [productID], callback)

    },
    deleteProduct: (productID, callback) => {
        db.query(`DELETE From Product Where ProductID = ? `, [productID], callback)
    }
}

module.exports = Product