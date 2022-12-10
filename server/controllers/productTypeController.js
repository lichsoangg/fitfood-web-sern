const ProductType = require("../models/ProductType.model")
const RolePermissions = require("../utils/constants")
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString")

const productTypeController = {
    getProductTypes: (req, res, next) => {
        ProductType.getProductTypes((err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, data })
        })
    },
    addProductType: (req, res, next) => {
        const data = req.body
        ProductType.addProductType(data, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Thêm thành công" })
        })
    },
    updateProductType: (req, res, next) => {
        const data = req.body
        const productTypeId = req.params.productTypeID
        const rowUpdateString = convertObjectToRowUpdateString(data)
        ProductType.updateProductType(rowUpdateString, productTypeId, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Cập nhật thành công" })
        })
    },
    deleteProductType: (req, res, next) => {
        const productTypeId = req.params.productTypeID
        ProductType.deleteProductType(productTypeId, (err, response) => {
            if (err?.errno === 1451) return res.status(400).json({ status: '1451', message: "Ràng buộc nên không thể xoá" })
            if (err) return res.status(400).json({ status: 200, message: err.message })
            return res.status(200).json({ status: 200, message: "Xoá thành công" })
        })
    }
}


module.exports = productTypeController