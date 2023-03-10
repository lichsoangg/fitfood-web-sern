const Purchase = require("../models/Purchase.model");
const db = require("../utils/connect_mysql");
const _ = require("lodash");
const e = require("express");
const purchaseController = {
  //Get Purchase
  getPurchase: (req, res, next) => {
    const state = Number(req.query.state) || null;
    const username = req.user.Username;
    if (Number(state) === -1) {
      //state=-1, get Products in cart
      Purchase.getProductsInCart({ username }, (err, productsInCart) => {
        if (err)
          return res.status(400).json({ status: 400, message: err.message });
        productsInCart.map((item) => {
          let avatar = item?.Avatar;
          if (avatar) {
            const originalUrl = `${req.protocol}://${req.get("host")}`;
            avatar = `${originalUrl}/images/${item?.Avatar}`;
          }
          return (item.Avatar = avatar);
        });
        return res
          .status(200)
          .json({ status: 200, data: { data: productsInCart } });
      });
    } else {
      //state != -1 , get bill and products user buy
      Purchase.getBills({ username, state }, (err, bills) => {
        if (err)
          return res.status(400).json({ status: 400, message: err.message });
        bills.map((item) => {
          let avatar = item?.Avatar;
          if (avatar) {
            const originalUrl = `${req.protocol}://${req.get("host")}`;
            avatar = `${originalUrl}/images/${item?.Avatar}`;
          }
          return (item.Avatar = avatar);
        });
        const purchase = bills.reduce((result, product) => {
          const {
            ProductID,
            Quantity,
            Name,
            Unit,
            Avatar,
            SalePrice,
            ...restProduct
          } = product;
          if (result[product.BillID]) {
            result[product.BillID].products = [
              ...result[product.BillID].products,
              { ProductID, Quantity, Name, Unit, Avatar, SalePrice },
            ];
          } else {
            result[product.BillID] = {
              ...restProduct,
              products: [
                { ProductID, Quantity, Name, Unit, Avatar, SalePrice },
              ],
            };
          }
          return result;
        }, {});
        const data = Object.values(purchase);
        return res.status(200).json({ status: 200, data: { data } });
      });
    }
  },
  addToCart: (req, res, next) => {
    const data = req.body;
    const { ProductID: productID, Quantity: quantity } = data;
    const username = req.user.Username;
    Purchase.searchInCart({ username, productID }, (err, response) => {
      const prevQuantity = response[0]?.Quantity;
      //when already has this product in cart
      if (prevQuantity && prevQuantity > 0) {
        Purchase.updateCart(
          {
            username,
            productID,
            quantity: Number(prevQuantity) + Number(quantity),
          },
          (err, response) => {
            if (err) {
              return res
                .status(400)
                .json({ status: 400, message: err.message });
            }
            return res.status(201).json({
              status: 201,
              message: "Thêm vào giỏ hàng thành công",
            });
          }
        );
      } else {
        //add new product to cart
        Purchase.addToCart({ username, data }, (err, response) => {
          if (err) {
            return res.status(400).json({ status: 400, message: err.message });
          }
          return res.status(201).json({
            status: 201,
            message: "Thêm vào giỏ hàng thành công",
          });
        });
      }
    });
  },
  //UPDATE CART
  updateCart: (req, res, next) => {
    const data = req.body;
    const { ProductID: productID, Quantity: quantity } = data;
    const username = req.user.Username;
    Purchase.searchInCart({ username, productID }, (err, response) => {
      const prevQuantity = response[0]?.Quantity;
      //when already has this product in cart
      if (prevQuantity && prevQuantity > 0) {
        Purchase.updateCart(
          {
            username,
            productID,
            quantity: quantity,
          },
          (err, response) => {
            if (err) {
              return res
                .status(400)
                .json({ status: 400, message: err.message });
            }
            return res.status(200).json({
              status: 200,
              message: "Cập nhật giỏ hàng thành công",
            });
          }
        );
      } else {
        return res.status(400).json({
          status: 400,
          message: "Sản phẩm không có trong giỏ hàng",
        });
      }
    });
  },
  //DELETE CART
  deleteCart: (req, res, next) => {
    const username = req.user.Username;
    const productIDArray = req.body;
    Purchase.deleteCart({ username, productIDArray }, (err, response) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }
      return res.status(200).json({
        status: 200,
        message: "Xoá sản phẩm thành công",
      });
    });
  },
  //Buy Products
  buyProducts: (req, res, next) => {
    const username = req.user.Username;
    const { Products: products, ...bill } = req.body;

    Purchase.addBill(
      {
        Date: bill.Date,
        State: bill.State,
        Username: username,
      },
      (err, response) => {
        if (err) {
          return res.status(400).json({ status: 400, message: err.message });
        }
        const billID = response.insertId;
        const productsData = products.map((product) => {
          return [billID, ...Object.values(product)];
        });
        Purchase.addDetailBill(productsData, (err, response) => {
          if (err) {
            return res.status(400).json({ status: 400, message: err.message });
          }
          return res.status(200).json({
            status: 200,
            message: "Đặt hàng thành công",
          });
        });
      }
    );
  },
};

module.exports = purchaseController;
