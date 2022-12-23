const DeliveryNoteDetail = require("../models/DeliveryNoteDetail.model")
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString")

const deliveryNodeDetailController = {
    getDeliveryNoteDetails: (req, res, next) => {
        const deliveryNoteID = req.params.deliveryNoteId
        DeliveryNoteDetail.getDeliveryNoteDetails({ deliveryNoteID }, (err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, data })

        })
    },
    addDeliveryNoteDetails: (req, res, next) => {
        const deliveryNoteID = req.params.deliveryNoteId
        const data = req.body.DetailDeliveryNotes
        DeliveryNoteDetail.addDeliveryNoteDetails({ deliveryNoteID, data }, (err, response) => {
            if (err?.errno === 1062 && err?.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ status: 1062, message: "Sản phẩm đã có trong hoá đơn" })
            }
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Thêm thành công" })
        })
    },
    updateDeliveryNoteDetail: (req, res, next) => {
        const data = req.body
        const rowUpdateString = convertObjectToRowUpdateString(data)
        const deliveryNoteID = req.params.deliveryNoteId
        const productID = req.params.productId
        DeliveryNoteDetail.updateDeliveryNoteDetail({ rowUpdateString, deliveryNoteID, productID }, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Cập nhật thành công" })
        })
    },
    deleteDeliveryNoteDetail: (req, res, next) => {
        const deliveryNoteID = req.params.deliveryNoteId
        const productID = req.params.productId
        DeliveryNoteDetail.deleteDeliveryNoteDetail({ deliveryNoteID, productID }, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Xoá thành công" })
        })
    }
}

module.exports = deliveryNodeDetailController