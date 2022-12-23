const DeliveryNoteController = require("../controllers/deliveryNoteController")

const router = require("express").Router()

router.get("/", DeliveryNoteController.getDeliveryNotes)
router.post("/", DeliveryNoteController.addDeliveryNote)
router.delete("/:deliveryNoteId", DeliveryNoteController.deleteDeliveryNote)
router.put("/:deliveryNoteId", DeliveryNoteController.updateDeliveryNote)

module.exports = router 