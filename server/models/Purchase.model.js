const db = require("../utils/connect_mysql")
const Purchase = {
  getBills: ({ username, state }, callback) => {
    db.query(
      `SELECT B.BillID, Date, State, B.Username,DB.ProductID, DB.Quantity,P.Name, Unit, P.Avatar, DB.SalePrice  
        FROM Bill B INNER JOIN User U ON B.Username=U.Username
        INNER JOIN DetailBIll DB ON DB.BillID = B.BillID
        INNER JOIN Product P ON DB.ProductID= P.ProductID
        WHERE 1=1 
        AND (? IS NULL OR ? = B.Username) 
        AND (? IS NULL OR ? = B.State) 
        `,
      [username, username, state, state],
      callback
    )
  },
  getProductsInCart: ({ username }, callback) => {
    db.query(
      `SELECT C.ProductID, C.Quantity,P.Name, Unit, P.Avatar, P.Price  
    FROM Cart C INNER JOIN Product P ON C.ProductID= P.ProductID
    WHERE 1=1 
    AND (? IS NULL OR ? = C.Username) 
    `,
      [username, username],
      callback
    )
  },
  addToCart: ({ username, data }, callback) => {
    db.query(
      `INSERT INTO Cart SET ?`,
      [{ ...data, Username: username }],
      callback
    )
  },
  searchInCart: ({ username, productID }, callback) => {
    db.query(
      `SELECT Quantity  FROM CART C WHERE 1=1
    AND (? IS NULL OR ? = C.Username)
    AND (? IS NULL OR ? = C.ProductID)`,
      [username, username, productID, productID],
      callback
    )
  },
  updateCart: ({ username, productID, quantity }, callback) => {
    db.query(
      `Update Cart C SET Quantity=${quantity} WHERE 1=1
    AND (? IS NULL OR ? = C.Username)
    AND (? IS NULL OR ? = C.ProductID)`,
      [username, username, productID, productID],
      callback
    )
  },
  deleteCart: ({ username, productIDArray }, callback) => {
    const injectedString =
      productIDArray?.map((c) => `'${c}'`).join(", ") || null
    db.query(
      `DELETE FROM Cart C WHERE 1=1
    AND (? IS NULL OR C.Username =?)
    ${injectedString ? ` AND  C.ProductID IN (${injectedString})` : ""}
   `,
      [username, username],
      callback
    )
  },
  addBill: (data, callback) => {
    db.query("INSERT INTO Bill SET ?", data, callback)
  },
  addDetailBill: (data, callback) => {
    db.query(
      "INSERT INTO DetailBill(BillID, ProductID, Quantity, SalePrice) Values ?",
      [data],
      callback
    )
  },
}

module.exports = Purchase
