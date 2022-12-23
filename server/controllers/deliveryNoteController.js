const DeliveryNote = require("../models/DeliveryNote.model")
const DeliveryNoteDetail = require("../models/DeliveryNoteDetail.model")
const convertObjectToRowUpdateString = require("../utils/convertObjectToRowUpdateString")

const DeliveryNoteController = {
    addDeliveryNote: (req, res, next) => {
        const data = req.body
        DeliveryNote.addDeliveryNote(data, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Thêm thành công" })
        })

    },
    getDeliveryNotes: (req, res, next) => {
        DeliveryNote.getDeliveryNotes((err, data) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, data })
        })
    },
    updateDeliveryNote: (req, res, next) => {
        const data = req.body
        const rowUpdateString = convertObjectToRowUpdateString(data)
        const deliveryNoteID = req.params.deliveryNoteId
        DeliveryNote.updateDeliveryNote(rowUpdateString, deliveryNoteID, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            return res.status(200).json({ status: 200, message: "Cập nhật thành công" })
        })
    },
    deleteDeliveryNote: (req, res, next) => {
        const deliveryNoteID = req.params.deliveryNoteId
        DeliveryNoteDetail.deleteDeliveryNoteDetails({ deliveryNoteID }, (err, response) => {
            if (err) return res.status(400).json({ status: 400, message: err.message })
            if (!err) {
                DeliveryNote.deleteDeliveryNote(deliveryNoteID, (err, response) => {
                    if (err?.errno === 1451) return res.status(400).json({ status: 1451, message: "Ràng buộc không thể xoá" })
                    if (err) return res.status(400).json({ status: 400, message: err.message })
                    return res.status(200).json({ status: 200, message: "Xoá thành công" })
                })
            }
        })

    },
}


module.exports = DeliveryNoteController