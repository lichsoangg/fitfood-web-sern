const Product = require("../models/Product.model");
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString");
const path = require("path");
const fs = require("fs");
const sqlFoundRows = require("../utils/sqlFoundRows");
const ProductController = {
  getProducts: (req, res, next) => {
    const search = req.query?.search?.replaceAll(" ", "") || "";
    const productType = req.query.product_type || null;
    const order = req.query.order || "best";
    const priceMax = Number(req.query.price_max) || null;
    const priceMin = Number(req.query.price_min) || null;
    const highLight = Number(req.query.high_light) || null;
    const limit = req.query.limit * 1 || 5;
    const page = req.query.page * 1 || 1;
    const rating = req.query.rating * 1 || 0;
    const numberOffset = page * limit - limit;
    const numberFetchNext = limit;
    Product.getProducts(
      {
        search,
        productType,
        order: order === "best" ? "DESC" : order,
        orderField: order === "best" ? "SoldQuantity" : "Price",
        priceMax,
        priceMin,
        highLight,
        rating,
        numberOffset,
        numberFetchNext,
      },
      async (err, data) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        }
        data.map((item) => {
          let avatar = item?.Avatar;
          if (avatar) {
            const originalUrl = `${req.protocol}://${req.get("host")}`;
            avatar = `${originalUrl}/images/${item?.Avatar}`;
          }
          return (item.Avatar = avatar);
        });
        const dataLength = await sqlFoundRows();
        const pageSize = Math.ceil(dataLength / limit);
        return res
          .status(200)
          .json({ status: 200, data: { data: data, pagesize: pageSize } });
      }
    );
  },
  addProduct: (req, res, next) => {
    const data = req.body;
    if (req.file) {
      data["Avatar"] = req.file.filename;
    }
    Product.addProduct(data, (err, response) => {
      if (err)
        return res.status(400).json({ status: 400, message: err.message });
      res.status(200).json({ status: 200, message: "Thêm thành công" });
    });
  },

  updateProduct: (req, res, next) => {
    const data = req.body;
    const productID = req.params.productID;

    if (req.file) {
      Product.getProducts(
        {
          search: "",
          productID,
          orderPrice: "ASC",
          numberOffset: 0,
          numberFetchNext: 1,
        },
        async (err, product) => {
          if (err)
            return res.status(400).json({ status: 400, message: err.message });
          if (product[0]?.Avatar) {
            let fileOldNameWithPath = path.join(
              __dirname,
              `../upload/images/${product[0].Avatar}`
            );
            if (fs.existsSync(fileOldNameWithPath)) {
              fs.unlink(fileOldNameWithPath, (err) => {
                if (err) {
                  throw err;
                }
              });
            }
          }
        }
      );
      data["Avatar"] = req.file.filename;
    }
    if (data["Avatar"]) {
      const originalUrl = `${req.protocol}://${req.get("host")}/images/`;
      data["Avatar"] = data["Avatar"].replace(originalUrl, "");
    }
    const rowUpdateString = convertObjectToRowUpdateString(data);
    Product.updateProduct(rowUpdateString, productID, (err, response) => {
      if (err)
        return res.status(400).json({ status: 400, message: err.message });
      return res
        .status(200)
        .json({ status: 200, message: "Cập nhật thành công" });
    });
  },
  deleteProduct: (req, res, next) => {
    const productID = req.params.productID;
    Product.deleteProduct(productID, (err, response) => {
      if (err?.errno === 1451)
        return res
          .status(400)
          .json({ status: "1451", message: "Ràng buộc nên không thể xoá" });
      if (err)
        return res.status(400).json({ status: 400, message: err.message });
      return res.status(200).json({ status: 200, message: "Xoá thành công" });
    });
  },
};

module.exports = ProductController;
