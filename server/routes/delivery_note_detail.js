const deliveryNodeDetailController = require("../controllers/deliveryNodeDetailController")

const router = require("express").Router()

router.post("/:deliveryNoteId", deliveryNodeDetailController.addDeliveryNoteDetails)
router.put("/:deliveryNoteId&:productId", deliveryNodeDetailController.updateDeliveryNoteDetail)
router.delete("/:deliveryNoteId&:productId", deliveryNodeDetailController.deleteDeliveryNoteDetail)
router.get("/:deliveryNoteId", deliveryNodeDetailController.getDeliveryNoteDetails)

module.exports = router