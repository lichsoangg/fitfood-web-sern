const Product = require("../models/Product.model")
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString")

const ProductController = {
    getProducts: (req, res, next) => {
        const search = req.query?.search?.replaceAll(' ', '') || ''
        const productType = req.query.product_type || ''
        const orderPrice = req.query.order_price || 'asc'

        const limit = req.query.limit * 1 || 5
        const page = req.query.page * 1 || 1
        const numberOffset = page * limit - limit
        const numberFetchNext = limit
        Product.getProducts({ search, productType, orderPrice, numberOffset, numberFetchNext }, (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })

            res.status(200).json({ status: 200, data })
        })
    },
    addProduct: (req, res, next) => {
        const data = req.body
        Product.addProduct(data, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            res.status(200).json({ status: 200, message: "Thêm thành công" })
        })
    },

    updateProduct: (req, res, next) => {
        const data = req.body
        const productID = req.params.productID
        const rowUpdateString = convertObjectToRowUpdateString(data)
        Product.updateProduct(rowUpdateString, productID, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Cập nhật thành công" })
        })
    },
    deleteProduct: (req, res, next) => {
        const productID = req.params.productID
        Product.deleteProduct(productID, (err, response) => {
            if (err?.errno === 1451) return res.status(400).json({ status: '1451', message: 'Ràng buộc nên không thể xoá' })
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Xoá thành công" })
        })
    }
}

module.exports = ProductController