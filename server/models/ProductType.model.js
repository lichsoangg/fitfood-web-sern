const db = require("../utils/connect_mysql");

const ProductType = {
  getProductTypes: (callback) => {
    db.query(`SELECT ProductTypeID, Name From ProductType`, callback);
  },
};

module.exports = ProductType;
