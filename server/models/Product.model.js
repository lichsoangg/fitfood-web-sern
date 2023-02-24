const db = require("../utils/connect_mysql");
const Product = {
  getProducts: (
    {
      search,
      productType,
      productID,
      orderPrice,
      priceMax,
      priceMin,
      numberOffset,
      numberFetchNext,
    },
    callback
  ) => {
    db.query(
      `
        SELECT ProductID, Product.Name as ProductName, Price, Quantity,Avatar, Unit, Highlight, Product.ProductTypeID as ProductTypeID, ProductType.Name as ProductTypeName 
        FROM Product INNER JOIN ProductType ON Product.ProductTypeID= ProductType.ProductTypeID 
        WHERE Replace(CONCAT(ProductID,'',Product.Name, Price, Quantity, Unit, Highlight, Product.ProductTypeID, Product.Name),' ','') Like ?
        AND (? IS NULL OR ? = Product.ProductTypeID )
        AND (? IS NULL OR ? = Product.ProductID )
        AND (? IS NULL OR ? <= Product.Price )
        AND (? IS NULL OR ? >= Product.Price )
        LIMIT ?,?`,
      [
        `%${search}%`,
        productType,
        productType,
        productID ? productID : null,
        productID ? productID : null,
        priceMin ? priceMin : null,
        priceMin ? priceMin : null,
        priceMax ? priceMax : null,
        priceMax ? priceMax : null,
        numberOffset,
        numberFetchNext,
      ],
      callback
    );
  },
  addProduct: (data, callback) => {
    db.query("INSERT INTO Product SET ?", data, callback);
  },
  updateProduct: (rowUpdateString, productID, callback) => {
    db.query(
      `UPDATE Product SET ${rowUpdateString} Where ProductID =? `,
      [productID],
      callback
    );
  },
  deleteProduct: (productID, callback) => {
    db.query(`DELETE From Product Where ProductID = ? `, [productID], callback);
  },
  countProducts: (callback) => {
    db.query(`SELECT COUNT(ProductID) as NumberProduct From Product`, callback);
  },
};

module.exports = Product;
