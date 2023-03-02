const db = require("../utils/connect_mysql");
const Product = {
  getProducts: (
    {
      search,
      productType,
      productID,
      order,
      orderField,
      priceMax,
      priceMin,
      highLight,
      rating,
      numberOffset,
      numberFetchNext,
    },
    callback
  ) => {
    db.query(
      `
      SELECT SQL_CALC_FOUND_ROWS P.ProductID, P.Name as ProductName, Price, P.Quantity,Avatar, Unit, Highlight, P.ProductTypeID as ProductTypeID, PT.Name as ProductTypeName, IFNULL(SUM(DB.Quantity),0) as SoldQuantity, IFNULL(ROUND(AVG(R.Rating),1),0) as Rating
      FROM Product P INNER JOIN ProductType PT ON P.ProductTypeID= PT.ProductTypeID 
      LEFT JOIN DetailBill DB ON DB.ProductID= P.ProductID
      LEFT JOIN Rating R ON R.ProductID= P.ProductID
        WHERE Replace(CONCAT(P.ProductID,'',P.Name, Price, P.Quantity, Unit, Highlight, P.ProductTypeID, P.Name),' ','') Like ?
        AND (? IS NULL OR ? = P.ProductTypeID )
        AND (? IS NULL OR ? = P.ProductID )
        AND (? IS NULL OR ? <= P.Price )
        AND (? IS NULL OR ? >= P.Price )
        AND (? IS NULL OR ? = P.Highlight)
        GROUP BY P.ProductID, P.Name, Price, P.Quantity ,Avatar, Unit, Highlight, P.ProductTypeID , PT.Name
        HAVING Rating >= ${rating}
        ORDER BY ${orderField} ${order}
        LIMIT ?,?
        `,
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
        highLight,
        highLight,
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
