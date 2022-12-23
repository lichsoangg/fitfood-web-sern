const middlewareController = require("../controllers/middlewareController")
const productTypeController = require("../controllers/productTypeController")
const RolePermissions = require("../utils/constants")

const router = require("express").Router()


router.get("/", productTypeController.getProductTypes)
router.put("/:productTypeID", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.ProductType.Update)], productTypeController.updateProductType)
router.post("/", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.ProductType.Add)], productTypeController.addProductType)
router.delete("/:productTypeID", [middlewareController.verifyToken, middlewareController.checkRole(RolePermissions.ProductType.Delete)], productTypeController.deleteProductType)

module.exports = router
