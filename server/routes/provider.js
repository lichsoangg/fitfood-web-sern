const router = require("express").Router()
const middlewareController = require("../controllers/middlewareController")
const providerController = require("../controllers/providerController")

router.get("/", providerController.getProviders)
router.post("/", providerController.addProvider)
router.put("/:providerId", providerController.updateProvider)
router.delete("/:providerId", providerController.deleteProvider)

module.exports = router;


