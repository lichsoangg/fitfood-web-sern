const Provider = require("../models/Provider.model")
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString")

const providerController = {
    getProviders: (req, res, next) => {
        Provider.getProviders((err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, data })
        })
    },
    addProvider: (req, res, next) => {
        const data = req.body
        Provider.addProvider(data, (err, response) => {
            if (err?.errno === 1062 && err?.code === "ER_DUP_ENTRY") return res.status(400).json({ status: 400, message: "Số điện thoại của nhà cung cấp đã được sử dụng" })
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Thêm thành công" })
        })
    },
    updateProvider: (req, res, next) => {
        const providerId = req.params.providerId
        const data = req.body
        const rowUpdateString = convertObjectToRowUpdateString(data)
        Provider.updateProvider(rowUpdateString, providerId, (err, response) => {
            if (err?.errno === 1062 && err?.code === "ER_DUP_ENTRY") return res.status(400).json({ status: 400, message: "Số điện thoại của nhà cung cấp đã được sử dụng" })
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Cập nhật thành công" })
        })
    },
    deleteProvider: (req, res, next) => {
        const providerId = req.params.providerId
        Provider.deleteProvider(providerId, (err, response) => {
            if (err?.errno === 1451) return res.status(400).json({ status: 400, message: "Ràng buộc không thể xoá" })
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Xoá thành công" })
        })
    }
}

module.exports = providerController
